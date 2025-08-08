import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }
  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
