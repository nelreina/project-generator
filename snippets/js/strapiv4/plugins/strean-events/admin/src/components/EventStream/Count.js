import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
export default function MappingCount({ count }) {
  return (
    <Box background="neutral" hasRadius={true} shadow="filterShadow">
      <Flex justifyContent="center" padding={8}>
        <Typography variant="beta">
          You have a total of {count} event mapping's
        </Typography>
      </Flex>
    </Box>
  );
}
