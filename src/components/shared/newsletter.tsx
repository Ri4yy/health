"use client";
import React, { useState } from 'react';
import { Input } from '../core/input';
import { Button } from '../core/button';
import { Gift } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] text-white">
      <div className="container py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary-100)] rounded-full mb-6">
            <Gift className="w-8 h-8 text-[var(--color-primary-600)]" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Получите скидку 15%</h2>
          <p className="text-lg text-white/90 mb-8">
            Подпишитесь на рассылку и получите промокод на первый заказ
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white"
            />
            <Button variant="secondary" size="lg" type="submit" className="sm:shrink-0">
              Получить промокод
            </Button>
          </form>
          
          <p className="text-xs text-white/70 mt-4">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </div>
      </div>
    </section>
  );
};
