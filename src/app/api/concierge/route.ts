import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query, locale } = await request.json();
    const isArabic = locale === 'ar' || /[\u0600-\u06FF]/.test(query || '');

    const lowerQuery = (query || '').toLowerCase();

    let reply = isArabic
      ? 'أهلاً بك في المساعد الملكي لشام للطيران. نسعد بخدمتك بتقديم أرقى خيارات الحجز، قائمة الأطعمة الدمشقية، وخدمات صالة الفيحاء بدمشق.'
      : 'Welcome to ASK SHAM Luxury Concierge. I am delighted to assist you with flight bookings, gourmet Damascene dining, and VIP Al-Fayhaa lounge arrangements.';

    if (lowerQuery.includes('menu') || lowerQuery.includes('food') || lowerQuery.includes('طعام') || lowerQuery.includes('عشاء')) {
      reply = isArabic
        ? 'تقدم درجاتنا الفاخرة قائمة "مذاق دمشق" المكونة من 5 أطباق تشمل مقبلات الشام الملكية، قوزي اللحم بالفستق الحلبي، وبوظة المسكة مع ورد دمشق.'
        : 'Our First & Business suites feature "A Taste of Damascus" 5-course fine dining, including Royal Mezze, Lamb Shank Ouzi, and authentic mastic ice cream with Damascus rose petals.';
    } else if (lowerQuery.includes('lounge') || lowerQuery.includes('صالة') || lowerQuery.includes('فيحاء')) {
      reply = isArabic
        ? 'تقع صالة الفيحاء بدمشق بمطار دمشق الدولي، وتضم بحرة تراثية مركزي، أشجار ياسمين طازجة، وسائق خاص برولز رويس للتوصيل إلى مدرج الطائرة.'
        : 'The Al-Fayhaa Flagship Lounge at Damascus International Airport features trickling marble courtyard fountains, fresh jasmine scents, and Rolls-Royce tarmac transfers.';
    } else if (lowerQuery.includes('seat') || lowerQuery.includes('suite') || lowerQuery.includes('جناح') || lowerQuery.includes('مقعد')) {
      reply = isArabic
        ? 'تتميز أجنحة الفيحاء للدرجة الأولى بمقاعد 82 بوصة مع أبواب منزلقة للخصوصية الكاملة، وأسرّة مستقيمة مجهزة بالحرير الطبيعي.'
        : 'Al-Fayhaa First Suites feature 82" private sanctuaries with sliding privacy doors, organic silk lie-flat beds, and 4K 32" OLED screens.';
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { reply: 'Pardon me, I am re-establishing connection with the Damascene luxury network.' },
      { status: 500 }
    );
  }
}
