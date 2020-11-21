import React, {useEffect, useState} from 'react';
import PostSkeleton from "./PostSkeleton";
import Post from './Post';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/core';
import CreateEditPostModal from './CreateEditPostModal';
import DeletePostModal from './DeletePostModal';
import { createPost, deletePost, editPost, getPosts } from '../api/api';
import {useQuery, useMutation, useQueryCache} from 'react-query';

const Posts = () => {
    const [loading, setLoading] = useState(true);
    const queryCache = useQueryCache();

    const [error, setError] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);

    const {isLoading, isFetching, data: posts = [], refetch} = useQuery('posts', getPosts);
    const [editMutation, {}] = useMutation(editPost, {
        onSuccess: () => queryCache.invalidateQueries('posts'),
        onMutate: ({id, post}) => {
            const oldPosts = queryCache.getQueryData('posts');
            const newPosts = oldPosts.map(oldPost => {
                if (oldPost.id === id) {
                    return post;
                }
                return oldPost;
            });
            queryCache.setQueryData('posts', newPosts);
        }
    });
    const [createMutation, {}] = useMutation(createPost, {
        onSuccess: () => queryCache.invalidateQueries('posts'),
        onMutate: (post) => {
            const oldPosts = queryCache.getQueryData('posts');
            const newPosts = [...oldPosts, post];
            queryCache.setQueryData('posts', newPosts);
        }
    });
    const [deleteMutation, {}] = useMutation(deletePost, {
        onSuccess: () => queryCache.invalidateQueries('posts'),
        onMutate: (id) => {
            const oldPosts = queryCache.getQueryData('posts');
            const newPosts = oldPosts.filter(oldPost => oldPost.id !== id);
            queryCache.setQueryData('posts', newPosts);
        }
    });

    const openCreateModal = () => {
        setSelectedPost(null);
        onOpen();
    }

    const closeEditModal = (post) => {
        if (!post) return;
        editMutation({id: post.id, post});
    }

    
    const closeCreateModal = (post) => {
        if (!post) return;
        createMutation(post);
    }

    const closeCreateEditModal = (post) => {
        if (post && post.id) closeEditModal(post);
        else if (post) closeCreateModal(post);
        onClose();
    }

    const openEditModal = (id) => {
        setSelectedPost(posts.find(post => post.id === id));
        onOpen();
    }

    const openDeleteModal = (id) => {
        setSelectedPost(posts.find(post => post.id === id));
        onDeleteOpen();
    }

    const closeDeleteModal = (confirmed) => {
        if (confirmed) {
            deleteMutation(selectedPost.id);
        }
        onDeleteClose();
    }

    if (isLoading) {
        return <div>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </div>
    }

    return (
        <Box w="100%">
            {posts.map(post => <Post post={post}
                                    key={post.id}
                                    onEditOpen={openEditModal}
                                    onDeleteOpen={openDeleteModal}/>
            )}
            <Flex align="flex-end" mt="24px" mr="24px" mb="24px" justify="flex-end">
                <Button onClick={openCreateModal}>Add new post</Button>
            </Flex>
            <CreateEditPostModal post={selectedPost} isOpen={isOpen} onClose={closeCreateEditModal} />
            <DeletePostModal isOpen={isDeleteOpen} onClose={closeDeleteModal} />
        </Box>
    );
}

export default Posts;