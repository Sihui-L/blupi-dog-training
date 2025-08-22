import React from 'react';
import { Container, Title, Text } from '@mantine/core';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  maxWidth?: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, maxWidth = 600 }) => {
  return (
    <Container size="lg" py={40}>
      <Title order={1} ta="center" mb={subtitle ? 32 : 48} c="gray.8">
        {title}
      </Title>
      
      {subtitle && (
        <Text ta="center" c="dimmed" mb={48} size="lg" maw={maxWidth} mx="auto">
          {subtitle}
        </Text>
      )}
    </Container>
  );
};

export default PageHeader;