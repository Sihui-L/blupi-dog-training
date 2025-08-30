import React from "react";
import {
  Card,
  CardSection,
  Title,
  Text,
  Button,
  Badge,
  Stack,
  Group,
  Image,
} from "@mantine/core";
import Link from "next/link";

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
  icon,
}) => {
  return (
    <Link href={link} style={{ textDecoration: "none" }} passHref>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        {image && (
          <CardSection>
            <div className="h-48 overflow-hidden">
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                fallbackSrc="https://via.placeholder.com/400x200/f3f4f6/9ca3af?text=Service+Image"
              />
            </div>
          </CardSection>
        )}
        <Stack gap="sm" mt={image ? "md" : 0} style={{ flex: 1 }}>
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
              <Badge variant="filled" size="sm" className="bg-green-900 text-white">
                {badge}
              </Badge>
            )}
          </Group>
          <Text size="sm" c="dimmed" lineClamp={3}>
            {description}
          </Text>
          {price && (
            <Text size="lg" fw={700} ta="center" className="text-green-900">
              {price}
            </Text>
          )}
          <Button
            variant="light"
            fullWidth
            mt="auto"
            radius="md"
            className="bg-green-50 text-green-900 hover:bg-green-100"
          >
            Learn More
          </Button>
        </Stack>
      </Card>
    </Link>
  );
};

export default ServiceCard;
