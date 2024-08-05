import React, { useState, useEffect } from 'react'
import { fetchPost } from '../utils/services.ts'
import Loader from '../components/Loader.tsx'
import Banner from '../assets/banner.png'
import Avatar1 from '../assets/avatars/avatar1.jpg'
import '../styles/pages/BlogPost.css'

const BlogPost: React.FC = () => {
  const [post, setPost] = useState<rawPost | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost();

        setPost(postData);
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
      }
    };
    loadPost();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('pt-BR', options).replace(' de ', ', ');
  };

  if (!post) return <Loader/>;

  return (
    <div className="post">
      <img src={Banner} alt="Banner do post" className='post__banner'/>
      <div className='post__container'>
        <h1 className='post__title'>{post.title}</h1>
        <h2 className='post__sub-title'>{post.subtitle}</h2>
        <div className='post__author'>
          <img src={Avatar1} alt="Foto do autor do post" className='post__avatar-img'/>
          <div>
            <div className='post__author-name'>{post.author.username}</div>
            <div className='post__timestamp'>{formatDate(post.timestamp)}</div>
          </div>
        </div>
        <div className="post__content" dangerouslySetInnerHTML={{ __html: post.content }}/>
      </div>
    </div>
  );
};

export default BlogPost;