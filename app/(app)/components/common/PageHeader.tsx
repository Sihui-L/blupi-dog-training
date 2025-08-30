import React from "react";
import { Container, Text, Stack } from "@mantine/core";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="bg-gradient-to-br from-green-900 to-cyan-700 text-white py-16 px-4 mb-12">
      <Container size="xl">
        <Stack align="center" gap="md">
          <Text size="48px" fw={700} ta="center">
            {title}
          </Text>
          {subtitle && (
            <Text size="xl" ta="center" maw={800}>
              {subtitle}
            </Text>
          )}
        </Stack>
      </Container>
    </section>
  );
};

export default PageHeader;
