'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      // console.log(data);
      if (session?.user.id) setMyPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    // console.log('aaaa');
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={session?.user.name}
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
