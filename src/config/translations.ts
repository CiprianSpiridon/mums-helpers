export type Language = 'en' | 'ar';

export type Translations = {
  [key in Language]: {
    // Navigation
    navigation: {
      back: string;
      next: string;
      completeBooking: string;
      processing: string;
      bookAnother: string;
      nextProperty: string;
      nextSchedule: string;
      nextLocation: string;
      nextContact: string;
    };
    // Steps
    serviceStep: {
      title: string;
      fromPrice: (price: number) => string;
      regularCleaning: string;
      deepCleaning: string;
      moveInOutCleaning: string;
      regularDescription: string;
      deepDescription: string;
      moveDescription: string;
    };
    propertyStep: {
      title: string;
      subtitle: string;
      propertyTypeLabel: string;
      house: string;
      houseDesc: string;
      flat: string;
      flatDesc: string;
      roomsLabel: string;
      roomsHelpText: string;
      cleaningSuppliesLabel: string;
      cleaningSuppliesDesc: string;
    };
    scheduleStep: {
      title: string;
      subtitle: string;
      dateLabel: string;
      timeLabel: string;
      durationLabel: string;
      hours: string;
    };
    locationStep: {
      title: string;
      subtitle: string;
      addressLabel: string;
      mapPlaceholder: string;
      mapHelpText: string;
      instructionsLabel: string;
      instructionsPlaceholder: string;
      instructionsHelpText: string;
    };
    contactStep: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      phoneHelpText: string;
      termsAgree: string;
      termsLink: string;
      privacyLink: string;
    };
    confirmationStep: {
      title: string;
      subtitle: (name: string) => string;
      summaryTitle: string;
      bookingIdLabel: string;
      serviceLabel: string;
      propertyLabel: string;
      dateTimeLabel: string;
      durationLabel: string;
      addressLabel: string;
      nameLabel: string;
      totalCostLabel: string;
    };
    // Progress Steps
    progressSteps: {
        service: string;
        property: string;
        schedule: string;
        location: string;
        contact: string;
        confirm: string;
        stepIndicator: (current: number, total: number) => string;
    };
    // Page Titles
    bookingPage: {
        title: string;
    };
    // My Bookings Page
    myBookingsPage: {
        title: string;
        filterStatus: string;
        filterService: string;
        tabAll: string;
        tabScheduled: string;
        tabCompleted: string;
        tabCancelled: string;
        noBookingsFound: string;
        noBookingsDescription: string;
        bookAService: string;
        bookingId: string;
        dateTime: string;
        duration: string;
        location: string;
        maid: string;
        price: string;
        reschedule: string;
        cancel: string;
        bookAgain: string;
        viewDetails: string;
    };
    // General / Common Terms
    common: {
        serviceRegular: string;
        serviceDeep: string;
        serviceMove: string;
        propertyHouse: string;
        propertyFlat: string;
        room: string;  // Singular
        rooms: string; // Plural
    };
    summary: string;
    totalCost: string;
    estimatedCost: string;
    basedOnSelection: string;
    requiredField: string;
    invalidEmail: string;
    invalidPhone: string;
    mapConfigRequired: string;
    mapConfigInstructions: string;
    startTimeRequired: string;
    aed: string; // Currency abbreviation
  };
};

export const translations: Translations = {
  en: {
    navigation: {
      back: 'Back',
      next: 'Continue',
      completeBooking: 'Complete Booking',
      processing: 'Processing...',
      bookAnother: 'Book Another Service',
      nextProperty: 'Next: Property Details',
      nextSchedule: 'Next: Schedule',
      nextLocation: 'Next: Location',
      nextContact: 'Next: Contact Info',
    },
    serviceStep: {
      title: 'Choose Your Service',
      fromPrice: (price) => `From AED ${price}`,
      regularCleaning: 'Regular Cleaning',
      deepCleaning: 'Deep Cleaning',
      moveInOutCleaning: 'Move-in/out Cleaning',
      regularDescription: 'Standard cleaning service for maintaining your home. Includes dusting, vacuuming, mopping, and bathroom cleaning.',
      deepDescription: 'Intensive cleaning that covers hard-to-reach areas, cabinets, appliances, and detailed bathroom sanitation.',
      moveDescription: 'Complete cleaning service when moving in or out. Includes all deep cleaning tasks plus inside cabinets, appliances, and windows.',
    },
    propertyStep: {
      title: 'Property Details',
      subtitle: 'Tell us about your property to customize your service.',
      propertyTypeLabel: 'Type of Property',
      house: 'House',
      houseDesc: 'Villa, townhouse or independent home',
      flat: 'Flat/Apartment',
      flatDesc: 'Apartment or flat in a building',
      roomsLabel: 'How many bedrooms do you have?',
      roomsHelpText: 'This helps us calculate the time needed for your service',
      cleaningSuppliesLabel: 'Do you need cleaning supplies?',
      cleaningSuppliesDesc: 'Our cleaner will bring all necessary cleaning products and equipment (additional fee)',
    },
    scheduleStep: {
      title: 'Schedule Your Cleaning',
      subtitle: 'Select a convenient date and time for your service.',
      dateLabel: 'Date',
      timeLabel: 'Start Time',
      durationLabel: 'Select Duration (min 2 hours)',
      hours: 'hours',
    },
    locationStep: {
      title: 'Where Should We Go?',
      subtitle: 'Let us know where to provide our cleaning service.',
      addressLabel: 'Your Address',
      mapPlaceholder: 'Enter your address or select from map',
      mapHelpText: 'Select a location on the map or type your address above',
      instructionsLabel: 'Special Instructions (Optional)',
      instructionsPlaceholder: 'e.g., Key under the mat, specific areas to focus on, gate code #1234',
      instructionsHelpText: 'Any details our cleaning professional should know?',
    },
    contactStep: {
      title: 'Contact Details',
      subtitle: 'Please provide your contact information to complete your booking.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Your email address',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'Your phone number',
      phoneHelpText: "We'll only use this to contact you about your booking",
      termsAgree: 'I agree to the',
      termsLink: 'Terms of Service',
      privacyLink: 'Privacy Policy',
    },
    confirmationStep: {
      title: 'Booking Confirmed!',
      subtitle: (name) => `Thank you ${name ? `, ${name}` : ''}! Your booking is confirmed. A confirmation has been sent to your email.`,
      summaryTitle: 'Booking Summary',
      bookingIdLabel: 'Booking ID',
      serviceLabel: 'Service',
      propertyLabel: 'Property',
      dateTimeLabel: 'Date & Time',
      durationLabel: 'Duration',
      addressLabel: 'Address',
      nameLabel: 'Name',
      totalCostLabel: 'Total Cost',
    },
    progressSteps: {
        service: 'Service Type',
        property: 'Property',
        schedule: 'Schedule',
        location: 'Location',
        contact: 'Contact',
        confirm: 'Confirm',
        stepIndicator: (current, total) => `Step ${current} of ${total}`,
    },
    bookingPage: {
        title: 'Book Your Maid Service'
    },
    myBookingsPage: {
        title: 'My Bookings',
        filterStatus: 'Status',
        filterService: 'Service Type',
        tabAll: 'All',
        tabScheduled: 'Scheduled',
        tabCompleted: 'Completed',
        tabCancelled: 'Cancelled',
        noBookingsFound: 'No bookings found',
        noBookingsDescription: 'Try changing your filters or book a new service.',
        bookAService: 'Book a Service',
        bookingId: 'Booking ID',
        dateTime: 'Date & Time',
        duration: 'Duration',
        location: 'Location',
        maid: 'Maid',
        price: 'Price',
        reschedule: 'Reschedule',
        cancel: 'Cancel',
        bookAgain: 'Book Again',
        viewDetails: 'View Details',
    },
    common: {
        serviceRegular: 'Regular Cleaning',
        serviceDeep: 'Deep Cleaning',
        serviceMove: 'Move-in/out Cleaning',
        propertyHouse: 'House',
        propertyFlat: 'Flat/Apartment',
        room: 'room',
        rooms: 'rooms',
    },
    summary: 'Summary',
    totalCost: 'Total Cost',
    estimatedCost: 'Estimated Cost',
    basedOnSelection: 'Based on your selections',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    mapConfigRequired: 'Map configuration required:',
    mapConfigInstructions: 'Please configure Google Maps API in your environment variables.',
    startTimeRequired: 'Please select a start time.',
    aed: 'AED',
  },
  ar: {
    navigation: {
      back: 'رجوع',
      next: 'متابعة',
      completeBooking: 'إكمال الحجز',
      processing: 'جاري المعالجة...',
      bookAnother: 'حجز خدمة أخرى',
      nextProperty: 'التالي: تفاصيل العقار',
      nextSchedule: 'التالي: الموعد',
      nextLocation: 'التالي: الموقع',
      nextContact: 'التالي: معلومات الاتصال',
    },
    serviceStep: {
      title: 'اختر خدمتك',
      fromPrice: (price) => `من ${price} د.إ`,
      regularCleaning: 'تنظيف عادي',
      deepCleaning: 'تنظيف عميق',
      moveInOutCleaning: 'تنظيف الانتقال',
      regularDescription: 'خدمة تنظيف قياسية للحفاظ على منزلك. تشمل إزالة الغبار والكنس والمسح وتنظيف الحمام.',
      deepDescription: 'تنظيف مكثف يغطي المناطق التي يصعب الوصول إليها والخزائن والأجهزة وتعقيم الحمام المفصل.',
      moveDescription: 'خدمة تنظيف كاملة عند الانتقال إلى منزل جديد أو مغادرته. تشمل جميع مهام التنظيف العميق بالإضافة إلى داخل الخزائن والأجهزة والنوافذ.',
    },
    propertyStep: {
      title: 'تفاصيل العقار',
      subtitle: 'أخبرنا عن عقارك لتخصيص خدمتك.',
      propertyTypeLabel: 'نوع العقار',
      house: 'منزل',
      houseDesc: 'فيلا، تاون هاوس أو منزل مستقل',
      flat: 'شقة',
      flatDesc: 'شقة في مبنى',
      roomsLabel: 'كم عدد غرف النوم لديك؟',
      roomsHelpText: 'يساعدنا هذا في حساب الوقت اللازم لخدمتك',
      cleaningSuppliesLabel: 'هل تحتاج إلى مواد تنظيف؟',
      cleaningSuppliesDesc: 'سيحضر المنظف جميع منتجات ومعدات التنظيف اللازمة (رسوم إضافية)',
    },
    scheduleStep: {
      title: 'حدد موعد التنظيف الخاص بك',
      subtitle: 'اختر تاريخًا ووقتًا مناسبين لخدمتك.',
      dateLabel: 'التاريخ',
      timeLabel: 'وقت البدء',
      durationLabel: 'اختر المدة (ساعتان على الأقل)',
      hours: 'ساعات',
    },
    locationStep: {
      title: 'أين يجب أن نذهب؟',
      subtitle: 'أخبرنا بمكان تقديم خدمة التنظيف.',
      addressLabel: 'عنوانك',
      mapPlaceholder: 'أدخل عنوانك أو اختر من الخريطة',
      mapHelpText: 'اختر موقعًا على الخريطة أو اكتب عنوانك أعلاه',
      instructionsLabel: 'تعليمات خاصة (اختياري)',
      instructionsPlaceholder: 'مثال: المفتاح تحت السجادة، مناطق محددة للتركيز عليها، رمز البوابة #1234',
      instructionsHelpText: 'هل هناك أي تفاصيل يجب أن يعرفها عامل التنظيف لدينا؟',
    },
    contactStep: {
      title: 'تفاصيل الاتصال',
      subtitle: 'يرجى تقديم معلومات الاتصال الخاصة بك لإكمال الحجز.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'اسمك الكامل',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'بريدك الإلكتروني',
      phoneLabel: 'رقم الهاتف',
      phonePlaceholder: 'رقم هاتفك',
      phoneHelpText: 'سنستخدم هذا فقط للاتصال بك بخصوص حجزك',
      termsAgree: 'أوافق على',
      termsLink: 'شروط الخدمة',
      privacyLink: 'سياسة الخصوصية',
    },
    confirmationStep: {
      title: 'تم تأكيد الحجز!',
      subtitle: (name) => `شكراً لك ${name ? `، ${name}` : ''}! تم تأكيد حجزك. تم إرسال التأكيد إلى بريدك الإلكتروني.`,
      summaryTitle: 'ملخص الحجز',
      bookingIdLabel: 'معرف الحجز',
      serviceLabel: 'الخدمة',
      propertyLabel: 'العقار',
      dateTimeLabel: 'التاريخ والوقت',
      durationLabel: 'المدة',
      addressLabel: 'العنوان',
      nameLabel: 'الاسم',
      totalCostLabel: 'التكلفة الإجمالية',
    },
    progressSteps: {
        service: 'نوع الخدمة',
        property: 'العقار',
        schedule: 'الموعد',
        location: 'الموقع',
        contact: 'الاتصال',
        confirm: 'تأكيد',
        stepIndicator: (current, total) => `خطوة ${current} من ${total}`,
    },
    bookingPage: {
        title: 'احجز خدمة الخادمة الخاصة بك'
    },
    myBookingsPage: {
        title: 'حجوزاتي',
        filterStatus: 'الحالة',
        filterService: 'نوع الخدمة',
        tabAll: 'الكل',
        tabScheduled: 'المجدولة',
        tabCompleted: 'المكتملة',
        tabCancelled: 'الملغاة',
        noBookingsFound: 'لم يتم العثور على حجوزات',
        noBookingsDescription: 'حاول تغيير عوامل التصفية أو حجز خدمة جديدة.',
        bookAService: 'احجز خدمة',
        bookingId: 'معرف الحجز',
        dateTime: 'التاريخ والوقت',
        duration: 'المدة',
        location: 'الموقع',
        maid: 'العاملة',
        price: 'السعر',
        reschedule: 'إعادة الجدولة',
        cancel: 'إلغاء',
        bookAgain: 'الحجز مرة أخرى',
        viewDetails: 'عرض التفاصيل',
    },
    common: {
        serviceRegular: 'تنظيف عادي',
        serviceDeep: 'تنظيف عميق',
        serviceMove: 'تنظيف الانتقال',
        propertyHouse: 'منزل',
        propertyFlat: 'شقة',
        room: 'غرفة',
        rooms: 'غرف',
    },
    summary: 'ملخص',
    totalCost: 'التكلفة الإجمالية',
    estimatedCost: 'التكلفة التقديرية',
    basedOnSelection: 'بناءً على اختياراتك',
    requiredField: 'هذا الحقل مطلوب',
    invalidEmail: 'الرجاء إدخال عنوان بريد إلكتروني صالح',
    invalidPhone: 'الرجاء إدخال رقم هاتف صالح',
    mapConfigRequired: 'تكوين الخريطة مطلوب:',
    mapConfigInstructions: 'يرجى تكوين Google Maps API في متغيرات البيئة الخاصة بك.',
    startTimeRequired: 'يرجى اختيار وقت البدء.',
    aed: 'د.إ',
  },
}; 