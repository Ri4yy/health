"use client";
import React, { useState } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Button } from '../components/core/button';
import { 
  Gift, 
  Star, 
  TrendingUp, 
  ShoppingBag, 
  Percent,
  Crown,
  Zap,
  Award,
  Calendar,
  ArrowRight,
  Check,
  Sparkles
} from 'lucide-react';

interface LoyaltyLevel {
  id: string;
  name: string;
  icon: React.ElementType;
  minSpend: number;
  cashback: number;
  benefits: string[];
  color: string;
  bgColor: string;
}

interface BonusTransaction {
  id: string;
  date: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
}

export const LoyaltyPage: React.FC<any> = ({ initialUser, initialProfile, initialHistory = [] }) => {
  const isLoggedIn = !!initialUser;
  const currentLevel = initialProfile?.loyalty_level || 'bronze';
  const currentBonuses = initialProfile?.bonus_balance || 0;
  const totalSpent = initialProfile?.total_spent || 0;

  const levels: LoyaltyLevel[] = [
    {
      id: 'bronze',
      name: 'Бронза',
      icon: Star,
      minSpend: 0,
      cashback: 3,
      benefits: [
        'Кэшбэк 3% бонусами',
        'Персональные акции',
        'Приветственный бонус 200 ₽',
      ],
      color: 'var(--color-secondary-600)',
      bgColor: 'var(--color-secondary-50)',
    },
    {
      id: 'silver',
      name: 'Серебро',
      icon: Award,
      minSpend: 10000,
      cashback: 5,
      benefits: [
        'Кэшбэк 5% бонусами',
        'Бесплатная доставка от 1500 ₽',
        'Эксклюзивные предложения',
        'Подарок в день рождения',
      ],
      color: 'var(--color-neutral-500)',
      bgColor: 'var(--color-neutral-50)',
    },
    {
      id: 'gold',
      name: 'Золото',
      icon: Crown,
      minSpend: 30000,
      cashback: 7,
      benefits: [
        'Кэшбэк 7% бонусами',
        'Бесплатная доставка всегда',
        'Приоритетная поддержка',
        'Ранний доступ к новинкам',
        'Персональный менеджер',
      ],
      color: 'var(--color-accent-500)',
      bgColor: 'var(--color-accent-50)',
    },
  ];

  const bonusHistory: BonusTransaction[] = initialHistory.map((h: any) => ({
    id: h.id,
    date: h.created_at,
    type: h.type,
    amount: h.amount,
    description: h.description
  }));

  const currentLevelData = levels.find(l => l.id === currentLevel);
  const currentLevelIndex = levels.findIndex(l => l.id === currentLevel);
  const nextLevel = levels[currentLevelIndex + 1];
  const progressToNext = nextLevel 
    ? Math.min((totalSpent / nextLevel.minSpend) * 100, 100)
    : 100;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header />
      
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] text-white py-16 md:py-24">
          <div className="container">
            <div className="max-w-[900px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-300)] backdrop-blur-sm rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Программа лояльности Точка Баланса</span>
              </div>
              
              <h1 className="text-white mb-6">
                Покупайте больше —<br />получайте больше
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-[600px] mx-auto">
                Зарабатывайте бонусы с каждой покупки и обменивайте их на скидки. 
                Чем больше покупаете, тем выше ваш статус и больше привилегий.
              </p>

              {!isLoggedIn && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-[var(--color-primary-600)] hover:bg-white/90"
                  >
                    Вступить в программу
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    Войти в аккаунт
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* User Status - Only if logged in */}
        {isLoggedIn && (
          <section className="py-12 md:py-16">
            <div className="container">
              <div className="max-w-[1200px] mx-auto">
                
                {/* Current Status Card */}
                <div className="bg-white rounded-[20px] border border-[var(--color-neutral-200)] p-6 md:p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Left: Status Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        {currentLevelData && (
                          <div 
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: currentLevelData.bgColor }}
                          >
                            <currentLevelData.icon 
                              className="w-7 h-7"
                              style={{ color: currentLevelData.color }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm text-[var(--color-neutral-600)] mb-1">Ваш статус</div>
                          <div className="text-2xl font-bold text-[var(--color-neutral-900)]">
                            {currentLevelData?.name}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between p-4 bg-[var(--color-primary-50)] rounded-[12px]">
                          <div className="flex items-center gap-3">
                            <Gift className="w-5 h-5 text-[var(--color-primary-600)]" />
                            <span className="text-sm text-[var(--color-neutral-700)]">Доступно бонусов</span>
                          </div>
                          <span className="text-xl font-bold text-[var(--color-primary-600)]">
                            {currentBonuses} ₽
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-[var(--color-neutral-600)]" />
                            <span className="text-sm text-[var(--color-neutral-700)]">Общая сумма покупок</span>
                          </div>
                          <span className="text-lg font-semibold text-[var(--color-neutral-900)]">
                            {totalSpent.toLocaleString()} ₽
                          </span>
                        </div>
                      </div>

                      {nextLevel && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[var(--color-neutral-700)]">
                              До уровня "{nextLevel.name}"
                            </span>
                            <span className="text-sm font-semibold text-[var(--color-neutral-900)]">
                              {nextLevel.minSpend - totalSpent} ₽
                            </span>
                          </div>
                          <div className="h-2 bg-[var(--color-neutral-200)] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-full transition-all"
                              style={{ width: `${progressToNext}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Benefits */}
                    <div>
                      <h4 className="mb-4">Ваши привилегии</h4>
                      <div className="space-y-2">
                        {currentLevelData?.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-[var(--color-primary-600)]" />
                            </div>
                            <span className="text-[var(--color-neutral-700)]">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bonus History */}
                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 md:p-8">
                  <h3 className="mb-6">История бонусов</h3>
                  
                  <div className="space-y-3">
                    {bonusHistory.map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-[12px] border border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-50)] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'earn' 
                              ? 'bg-[var(--color-success-light)]' 
                              : 'bg-[var(--color-neutral-100)]'
                          }`}>
                            {transaction.type === 'earn' ? (
                              <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
                            ) : (
                              <ShoppingBag className="w-5 h-5 text-[var(--color-neutral-600)]" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-[var(--color-neutral-900)] mb-0.5">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-[var(--color-neutral-600)]">
                              {new Date(transaction.date).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        <div className={`text-lg font-semibold ${
                          transaction.type === 'earn' 
                            ? 'text-[var(--color-success)]' 
                            : 'text-[var(--color-neutral-600)]'
                        }`}>
                          {transaction.type === 'earn' ? '+' : ''}{transaction.amount} ₽
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Как работает программа</h2>
                <p className="text-lg text-[var(--color-neutral-600)] max-w-[600px] mx-auto">
                  Простая и прозрачная система накопления и использования бонусов
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-[var(--color-primary-600)]" />
                  </div>
                  <div className="mb-2 text-sm font-semibold text-[var(--color-primary-600)] uppercase tracking-wider">
                    Шаг 1
                  </div>
                  <h4 className="mb-3">Совершайте покупки</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Зарабатывайте бонусы с каждого заказа. Чем выше ваш статус, тем больше процент кэшбэка.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-[var(--color-primary-600)]" />
                  </div>
                  <div className="mb-2 text-sm font-semibold text-[var(--color-primary-600)] uppercase tracking-wider">
                    Шаг 2
                  </div>
                  <h4 className="mb-3">Повышайте статус</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Достигайте новых уровней и получайте эксклюзивные привилегии и больший кэшбэк.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Gift className="w-8 h-8 text-[var(--color-primary-600)]" />
                  </div>
                  <div className="mb-2 text-sm font-semibold text-[var(--color-primary-600)] uppercase tracking-wider">
                    Шаг 3
                  </div>
                  <h4 className="mb-3">Тратьте бонусы</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Используйте накопленные бонусы для оплаты следующих заказов — 1 бонус = 1 рубль.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Levels */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Уровни программы</h2>
                <p className="text-lg text-[var(--color-neutral-600)] max-w-[600px] mx-auto">
                  Три уровня привилегий — выбирайте свой путь к выгодным покупкам
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {levels.map((level, index) => (
                  <div
                    key={level.id}
                    className={`rounded-[20px] p-6 md:p-8 border-2 transition-all ${
                      level.id === currentLevel && isLoggedIn
                        ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                        : 'border-[var(--color-neutral-200)] bg-white hover:border-[var(--color-neutral-300)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: level.bgColor }}
                      >
                        <level.icon
                          className="w-6 h-6"
                          style={{ color: level.color }}
                        />
                      </div>
                      {level.id === currentLevel && isLoggedIn && (
                        <span className="px-3 py-1 bg-[var(--color-primary-500)] text-white text-xs font-semibold rounded-full">
                          Ваш уровень
                        </span>
                      )}
                    </div>

                    <h3 className="mb-2">{level.name}</h3>
                    <p className="text-sm text-[var(--color-neutral-600)] mb-4">
                      {level.minSpend === 0 
                        ? 'Стартовый уровень' 
                        : `От ${level.minSpend.toLocaleString()} ₽`}
                    </p>

                    <div className="mb-6 p-4 bg-white rounded-[12px] border border-[var(--color-neutral-200)]">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--color-primary-600)] mb-1">
                          {level.cashback}%
                        </div>
                        <div className="text-sm text-[var(--color-neutral-600)]">
                          кэшбэк бонусами
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {level.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[var(--color-primary-600)] flex-shrink-0 mt-1" />
                          <span className="text-sm text-[var(--color-neutral-700)]">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rules / Terms */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="bg-[var(--color-neutral-50)] rounded-[16px] p-6 md:p-8">
                <h4 className="mb-4">Правила программы</h4>
                <div className="space-y-3 text-sm text-[var(--color-neutral-700)]">
                  <p>• Бонусы начисляются автоматически после получения заказа</p>
                  <p>• 1 бонус = 1 рубль при оплате следующих заказов</p>
                  <p>• Можно оплатить бонусами до 30% стоимости заказа</p>
                  <p>• Бонусы действительны в течение 12 месяцев с момента начисления</p>
                  <p>• Статус пересчитывается каждые 3 месяца на основе суммы покупок</p>
                  <p>• Бонусы не начисляются на доставку и при использовании промокодов</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
