import { Button, Flex } from "@chakra-ui/react";

type ICategoryListProps = {
  categories: string[];
  selectedCategory: string;
  handleChangeCategory: (category: string) => void;
};

const CategoryList = ({ categories, handleChangeCategory, selectedCategory }: ICategoryListProps) => {
  return (
    <Flex wrap="nowrap" justifyContent="start" w="full" mb="5" gap="4">
      {categories.map((category) => (
        <Button
          key={category}
          textTransform="lowercase"
          size="sm"
          variant="solid"
          rounded="full"
          bgColor={selectedCategory === category ? "primary.500" : "gray.700"}
          onClick={() => handleChangeCategory(category)}
          _hover={{ bgColor: "primary.500" }}
        >
          #{category}
        </Button>
      ))}
    </Flex>
  );
};

export default CategoryList;
