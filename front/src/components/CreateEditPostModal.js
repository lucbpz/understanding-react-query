import React, {useEffect, useState} from 'react';

import {
    Button, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/core'

const CreateEditPostModal = ({post, isOpen, onClose}) => {
    const title = post ? 'Edit Post' : 'Create Post';
    const [editedPost, setEditedPost] = useState(null);
    useEffect(() => {
        setEditedPost(post);
    }, [post]);

    const handleChange = (ev) => {
        setEditedPost({...editedPost, [ev.target.id]: ev.target.value});
    }

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} bottom="0" size="full">
            <ModalOverlay />
            <ModalContent m="0" position="fixed" top="auto" bottom="0" >
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <FormControl isRequired>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input id="title" placeholder="Title" value={editedPost?.title} onChange={handleChange} />
                    <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
                    <Input id="imageUrl" placeholder="Image URL" value={editedPost?.imageUrl} onChange={handleChange} />
                    <FormLabel htmlFor="imageAlt">Image Alt</FormLabel>
                    <Input id="imageAlt" placeholder="Image Alt" value={editedPost?.imageAlt} onChange={handleChange} />
                    <FormLabel htmlFor="minRead">Min read</FormLabel>
                    <Input id="minRead" placeholder="minRead" value={editedPost?.minRead} onChange={handleChange} />
                    <FormLabel htmlFor="publishDate">Publish Date</FormLabel>
                    <Input id="publishDate" placeholder="Oct 2020" value={editedPost?.publishDate} onChange={handleChange} />
                </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button variantColor="blue" mr={3} onClick={() => onClose(editedPost)}>
                        Save
                    </Button>
                    <Button onClick={() => onClose()} variant="ghost">Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateEditPostModal;