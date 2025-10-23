import * as React from 'react';
import { Html, Text, Heading, Container, Section } from '@react-email/components';


export const ResetCodeEmail = ({ code }) => {
  return React.createElement(
    Html,
    { lang: 'ru' },
    React.createElement(
      Section,
      { style: { backgroundColor: '#f2f2f2', padding: '20px' } },
      React.createElement(
        Container,
        { style: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px' } },
        React.createElement(Heading, null, 'Сброс пароля'),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '42px',fontFamily: 'AGLettericaCondensedCRegular'  } }, 'Перейдите по ссылке для сброса пароля:'),
        React.createElement(
          Text,
          { style: { fontSize: '24px', fontWeight: 'bold' } },
          code
        ),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '42px',fontFamily: 'AGLettericaCondensedCRegular'  } }, 'Если вы не запрашивали сброс, просто проигнорируйте данное письмо.'),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '42px',fontFamily: 'AGLettericaCondensedCRegular'  } }, '-- '),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '12px',fontFamily: 'AGLettericaCondensedCRegular'  } }, 'С уважением ООО СМК «Урал-Рецепт М»'),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '12px',fontFamily: 'AGLettericaCondensedCRegular'  } }, 'E-mail: mail@u-rm.ru'),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '12px',fontFamily: 'AGLettericaCondensedCRegular'  } }, 'Многоканальный Телефон: +7 (343) 286-44-00'),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '12px',fontFamily: 'AGLettericaCondensedCRegular'  } }, 'Телефон горячей линии: +7 (343) 286-80-80'),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '24px',fontFamily: 'AGLettericaCondensedCRegular'  } }, '620075 Центральный офис: г. Екатеринбург, ул. Карла Либкнехта, д. 22 , офис 302 (правое крыло)'),
        React.createElement(Text, { style: { fontSize: '18px', color: '#black', fontWeight: '500', lineHeight: '12px',fontFamily: 'AGLettericaCondensedCRegular'  } }, 'Uralrecipe_lk')
      )
    )
  );
};

// { style: { fontSize: '33px', color: '#black', fontWeight: '500', lineHeight: '42px',fontFamily: 'AGLettericaCondensedCRegular'  } },
