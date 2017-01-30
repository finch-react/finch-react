import {Component, PropTypes} from 'react';
import fetch from '../../lib/fetch';
import Page from '../../lib/Page';
import RedditCommentsList from '../../components/RedditCommentList/index';
import RedditPost from '../../components/RedditPost/index';
import Preloader from '../../components/Preloader/index';

export default class extends Page {

  static model(params) {
    let sort = params.sort || 'new';
    return fetch(`https://www.reddit.com/comments/${params.id}.json?limit=10&sort=${sort}`).then(response => response.json())
  };

  render() {
    console.log('Render', this.props.request.params);
    let post = this.state.model && this.state.model[0] && this.state.model[0].data.children[0];
    let comments = this.state.model && this.state.model[1] && this.state.model[1].data.children;
    return (
      <div>
        {
          post && comments ? <div>
              {post && <RedditPost {...post.data} />}
              {comments && <RedditCommentsList comments={comments}/>}
            </div> : <Preloader />
        }

      </div>
    );
  };

}
