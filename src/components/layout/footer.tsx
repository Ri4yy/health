import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-neutral-900)] text-white mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <h3 className="text-lg font-semibold mb-4 !text-white">ЭкоЕда</h3>
            <p className="text-sm text-[var(--color-neutral-300)] mb-4">
              Здоровое питание с доставкой. Готовые блюда и наборы продуктов для сбалансированного рациона.
            </p>
            {/* <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[var(--color-neutral-800)] hover:bg-[var(--color-primary-500)] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[var(--color-neutral-800)] hover:bg-[var(--color-primary-500)] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[var(--color-neutral-800)] hover:bg-[var(--color-primary-500)] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div> */}
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-semibold mb-4 !text-white">Контакты</h4>
            <div className="space-y-3">
              <a href="tel:+79999999999" className="flex items-center gap-2 text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +7 (999) 999-99-99
              </a>
              <a href="mailto:info@ecoeda.ru" className="flex items-center gap-2 text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@ecoeda.ru
              </a>
              <div className="flex items-start gap-2 text-sm text-[var(--color-neutral-300)]">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>г. Чебоксары, Московский просп., 15</span>
              </div>
            </div>
          </div>

          {/* Информация */}
          <div>
            <h4 className="font-semibold mb-4 !text-white">Информация</h4>
            <nav className="space-y-2">
              <Link href="/delivery" className="block text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                О доставке
              </Link>
              <Link href="/payment" className="block text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                Способы оплаты
              </Link>
              <Link href="/loyalty" className="block text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                Программа лояльности
              </Link>
            </nav>
          </div>

          {/* Правовая информация */}
          {/* <div>
            <h4 className="font-semibold mb-4">Правовая информация</h4>
            <nav className="space-y-2">
              <Link href="/privacy-policy" className="block text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="block text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                Пользовательское соглашение
              </Link>
              <Link href="/offer" className="block text-sm text-[var(--color-neutral-300)] hover:text-white transition-colors">
                Публичная оферта
              </Link>
            </nav>
          </div> */}
        </div>

        <div className="border-t border-[var(--color-neutral-800)] mt-8 pt-8 text-center">
          <p className="text-sm text-[var(--color-neutral-400)]">
            © 2026 ЭкоЕда. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
