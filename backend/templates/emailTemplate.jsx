import { Html, Text, Heading, Container, Section } from '@react-email/components';
import * as React from 'react';

export const ResetCodeEmail = ({ code }) => (
  <Html lang="ru">
    <Section style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px' }}>
        <Heading>Сброс пароля</Heading>
        <Text>Ваш код для сброса пароля:</Text>
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>{code}</Text>
        <Text>Если вы не запрашивали сброс, просто проигнорируйте это письмо.</Text>
      </Container>
    </Section>
  </Html>
);