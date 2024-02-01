'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetail = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (session?.user.id && promptId) getPromptDetail();
  }, [promptId]);

  const upatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Missing of Prompt ID');
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={upatePrompt}
      />
    </div>
  );
};

export default UpdatePrompt;
