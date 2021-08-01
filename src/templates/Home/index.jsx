import { Component } from 'react'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { loadPosts } from '../../utils/load-posts'
import './styles.css'
import { TextInput } from '../../components/TextInput'

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    postsPerPage: 52,
    page: 1,
    searchValue: '',
  }

  async componentDidMount(){
    await this.loadPosts()
  }

  loadPosts = async() => {
    const postsAndPhotos = await loadPosts()
    const { postsPerPage, page, searchValue } = this.state

    this.setState(
      {
        allPosts: postsAndPhotos,
        posts: postsAndPhotos.slice(0, postsPerPage),
        postsPerPage,
        page,
        searchValue,
      })
  }

  loadMorePosts() {
    const {posts, allPosts, postsPerPage, page, searchValue } = this.state
    const nextPage = page + 1
    posts.push(...allPosts.slice(page * postsPerPage, nextPage * postsPerPage))
    this.setState(
      {
        allPosts,
        posts,
        postsPerPage,
        page:nextPage,
        searchValue
      })
  } 

  handleClick()
  {
    debugger
    this.loadMorePosts();
  }

  handleChange = (e) => {
    const {value} = e.target
    this.setState({searchValue: value})
  }
    
  render() {
    const { posts, allPosts, postsPerPage, page, searchValue } = this.state
    const noMorePosts = page*postsPerPage >= allPosts.length
    const filteredPosts = !!searchValue ? 
      posts.filter(post => post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      ))
      : posts

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
              <h1>SearchValue: {searchValue}</h1>
          )}
          <TextInput handleChange={this.handleChange} searchValue={searchValue} />
        </div>
        
        {
          filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)
        }
        {
          filteredPosts.length === 0 && (<p>Não existem posts</p>)
        }
        <div className="button-container">
          {!searchValue && (<Button
            text="Carregar mais posts"
            onClick={() => this.handleClick()}
            disabled={noMorePosts}
          />)}
        </div>
      </section>
    );
  }  
}

export default Home;
