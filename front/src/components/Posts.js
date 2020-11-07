import React, {useEffect, useState} from 'react';
import PostSkeleton from "./PostSkeleton";
import Post from './Post';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/core';
import CreateEditPostModal from './CreateEditPostModal';
import DeletePostModal from './DeletePostModal';
import { createPost, deletePost, editPost, getPosts } from '../api/api';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);
    useEffect(() => {
        setLoading(true);
        getPosts().then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    const openCreateModal = () => {
        setSelectedPost(null);
        onOpen();
    }

    const closeEditModal = (post) => {
        if (!post) return;
        setLoading(true);
        editPost(post.id, post).then(() => {
            getPosts().then((data) => {
                setPosts(data);
                setLoading(false);
            });
        })
    }

    
    const closeCreateModal = (post) => {
        if (!post) return;
        setLoading(true);
        createPost(post).then(() => {
            getPosts().then((data) => {
                setPosts(data);
                setLoading(false);
            });
        })
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
            deletePost(selectedPost.id).then(() => {
                setLoading(true);
                getPosts().then((data) => {
                    setPosts(data);
                    setLoading(false);
                });
            });
        }
        onDeleteClose();
    }

    if (loading) {
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