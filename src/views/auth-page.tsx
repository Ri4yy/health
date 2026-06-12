"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Button } from '../components/core/button';
import { Input } from '../components/core/input';
import { Checkbox } from '../components/core/checkbox';
import { Eye, EyeOff, Sparkles, Check } from 'lucide-react';
import { ToastContainer } from '../components/shared/toast';

type AuthMode = 'login' | 'register' | 'phone';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };
  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    phoneCode: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (mode === 'register' && !formData.name) {
      newErrors.name = 'Введите ваше имя';
    }
    
    if (!formData.email) {
      newErrors.email = 'Введите email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    }
    
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (mode === 'register' && !formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Необходимо согласие с условиями';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
        if (error) {
           addToast('error', error.message);
           setIsLoading(false);
        } else {
           addToast('success', 'Успешный вход!');
           window.location.href = '/account';
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email, 
          password: formData.password,
          options: { data: { full_name: formData.name } }
        });
        if (error) {
          addToast('error', error.message);
          setIsLoading(false);
        } else if (data.session === null) {
          addToast('success', 'Регистрация прошла успешно! Проверьте вашу почту для активации.');
          setMode('login'); // Switch to login instead of redirecting
          setIsLoading(false);
        } else {
          addToast('success', 'Успешная регистрация и вход!');
          window.location.href = '/account';
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 md:py-16">
        <div className="container">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-center">
              {/* Auth Form */}
              <div className="w-full max-w-md">
                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 md:p-8">
                  
                  {/* Mode Switcher */}
                  <div className="flex gap-2 p-1 bg-[var(--color-neutral-50)] rounded-[12px] mb-8">
                    <button
                      onClick={() => setMode('login')}
                      className={`flex-1 px-4 py-2.5 rounded-[8px] text-sm font-medium transition-all ${
                        mode === 'login'
                          ? 'bg-white text-[var(--color-primary-600)] shadow-sm'
                          : 'text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)]'
                      }`}
                    >
                      Вход
                    </button>
                    <button
                      onClick={() => setMode('register')}
                      className={`flex-1 px-4 py-2.5 rounded-[8px] text-sm font-medium transition-all ${
                        mode === 'register'
                          ? 'bg-white text-[var(--color-primary-600)] shadow-sm'
                          : 'text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)]'
                      }`}
                    >
                      Регистрация
                    </button>
                  </div>

                  {/* Welcome */}
                  <div className="mb-6">
                    <h2 className="mb-2">
                      {mode === 'register' ? 'Создать аккаунт' : mode === 'phone' ? 'Вход по номеру' : 'Добро пожаловать'}
                    </h2>
                    <p className="text-[var(--color-neutral-600)]">
                      {mode === 'register' 
                        ? 'Заполните форму для создания аккаунта' 
                        : 'Войдите в свой аккаунт'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Name - Register only */}
                    {mode === 'register' && (
                      <Input
                        label="Имя"
                        type="text"
                        placeholder="Как вас зовут?"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={errors.name}
                        disabled={isLoading}
                      />
                    )}

                    {/* Email */}
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                      disabled={isLoading}
                    />

                    {/* Password */}
                    <div className="relative">
                      <Input
                        label="Пароль"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Введите пароль"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors.password}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Confirm Password - Register only */}
                    {mode === 'register' && (
                      <div className="relative">
                        <Input
                          label="Подтвердите пароль"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Повторите пароль"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          error={errors.confirmPassword}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-[38px] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)] transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Terms Agreement - Register only */}
                    {mode === 'register' && (
                      <div>
                        <Checkbox
                          checked={formData.agreedToTerms}
                          onChange={(checked) => setFormData({ ...formData, agreedToTerms: checked })}
                          label={
                            <span className="text-sm">
                              Я согласен с{' '}
                              <a href="#" className="text-[var(--color-primary-600)] hover:underline">
                                политикой конфиденциальности
                              </a>{' '}
                              и{' '}
                              <a href="#" className="text-[var(--color-primary-600)] hover:underline">
                                пользовательским соглашением
                              </a>
                            </span>
                          }
                          disabled={isLoading}
                        />
                        {errors.agreedToTerms && (
                          <p className="mt-2 text-sm text-[var(--color-error)]">{errors.agreedToTerms}</p>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isLoading}
                    >
                      {mode === 'register' ? 'Создать аккаунт' : 'Войти'}
                    </Button>



                    {/* Switch to Register/Login */}
                    <div className="text-center text-sm text-[var(--color-neutral-600)]">
                        {mode === 'login' ? (
                          <>
                            Нет аккаунта?{' '}
                            <button
                              type="button"
                              onClick={() => setMode('register')}
                              className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] font-medium transition-colors"
                              disabled={isLoading}
                            >
                              Зарегистрироваться
                            </button>
                          </>
                        ) : (
                          <>
                            Уже есть аккаунт?{' '}
                            <button
                              type="button"
                              onClick={() => setMode('login')}
                              className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] font-medium transition-colors"
                              disabled={isLoading}
                            >
                              Войти
                            </button>
                          </>
                        )}
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
