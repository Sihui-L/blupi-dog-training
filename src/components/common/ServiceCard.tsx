import React from 'react';
import { Card, Title, Text, Button, Badge, Stack, Group, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  image?: string;
  badge?: string;
  link: string;
  icon?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  image,
  badge,
  link,
  icon
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" component={Link} to={link}>
      {image && (
        <Card.Section>
          <Image 
            src={image} 
            alt={title}
            height={200}
            fallbackSrc="https://via.placeholder.com/400x200/f3f4f6/9ca3af?text=Service+Image"
          />
        </Card.Section>
      )}
      
      <Stack gap="sm" mt={image ? 'md' : 0} style={{ flex: 1 }}>
        {icon && (
          <Group justify="center" mb="xs">
            {icon}
          </Group>
        )}
        
        <Group justify="space-between" align="flex-start">
          <Title order={3} size="h4" lineClamp={2} style={{ flex: 1 }}>
            {title}
          </Title>
          {badge && (
            <Badge color="primary" variant="filled" size="sm">
              {badge}
            </Badge>
          )}
        </Group>
        
        <Text size="sm" c="dimmed" lineClamp={3}>
          {description}
        </Text>
        
        {price && (
          <Text size="lg" fw={700} c="primary" ta="center">
            {price}
          </Text>
        )}
        
        <Button variant="light" color="primary" fullWidth mt="auto" radius="md">
          Learn More
        </Button>
      </Stack>
    </Card>
  );
};

export default ServiceCard;