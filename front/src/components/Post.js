// Sample card from Airbnb
import {Box, Image, Badge, Button} from '@chakra-ui/core';

const Post = ({onEditOpen, onDeleteOpen, post}) => {

    return (
      <Box d="flex" flexDirection={{md: 'row', xs: 'column'}} borderWidth="1px" rounded="lg" overflowY="hidden">
        <Image maxW="sm" src={post.imageUrl} alt={post.imageAlt} />
  
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
                {post.publishDate}
            </Box>
          </Box>
  
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {post.title}
          </Box>
  
          <Box as="span" color="gray.600" fontSize="sm">
            {post.minRead} min read
          </Box>
  
          <Box d="flex" mt="2" alignItems="center">
              {post.tags?.map(tag => (
                <Badge key={tag} rounded="full" px="2" variantColor="teal">
                  {tag}
              </Badge>
              ))}
          </Box>

          <Box d="flex" mt="2" alignItems="center">
            <Button onClick={() => onEditOpen(post.id)}>Edit</Button>
            <Button onClick={() => onDeleteOpen(post.id)} variantColor="red">Delete</Button>
          </Box>
        </Box>
      </Box>
    );
  }

  export default Post;