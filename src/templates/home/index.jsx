import { Component } from 'react';
import '../../styles/styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../util/load-posts';
import { Button } from '../../components/button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10
  };

  async componentDidMount() {
    await this.loadposts();
  }

  loadposts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage), 
      allPosts: postsAndPhotos, 
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  render() {
  const { posts, page, postsPerPage, allPosts } = this.state;
  const noMorePosts = page + postsPerPage >= allPosts.length;

  return (
    <section className="container">
      <Posts posts={posts} />

      <div class="button-container">
        <Button
          text="Load more posts" 
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
        />
      </div>
    </section>
    )
  }
}  
