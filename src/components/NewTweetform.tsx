import React, { FormEvent, useCallback } from 'react'
import Button from './Button'
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api';
import ProfileImage from './ProfileImage';

function updatetextAreaSize(textArea?: HTMLTextAreaElement) {
    textArea ? textArea.style.height = `${textArea?.scrollHeight}px` : '';
}

function NewTweetform() {
    const session = useSession();
    const [inputValue, setInputValue] = useState("");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {

        updatetextAreaSize(textArea);
        textAreaRef.current = textArea;

    }, []);

    const createtweet = api.tweet.create.useMutation({onSuccess: (newTweet) => {

        console.log(newTweet);
        setInputValue("");
    },

    });

    useLayoutEffect(() => {
        updatetextAreaSize(textAreaRef.current);

    }, [inputValue]);


    if (session.status !== 'authenticated') {
      return null;
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        createtweet.mutate({content:inputValue});

    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 px-2 border-b py-2 '>


            <div className='flex gap-4'>
                <ProfileImage src={session.data?.user.image} />

                <textarea
                    ref={inputRef}
                    style={{ height: 0 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}

                    placeholder="What's happening ?" className='flex-grow px-4 py-2 rounded-sm text-lg outline-none resize-none overflow-hidden text-center'>


                </textarea>
            </div>
            <Button> Message </Button>
        </form>
    )
}

export default NewTweetform