//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER = '/user';
const USER_SIGNUP = '/signup';
const USER_SIGNIN = '/signin';

// Post
const POST = '/posts';
const POST_DETAIL = '/:postId';
const POST_SEARCH = '/search/:categoryId';

//comment
const COMMENT = '/comments';
const COMMENT_DETAIL = '/:commentId'

const routes = {
  root: ROOT,
  user: USER,
  signup: USER_SIGNUP,
  signin: USER_SIGNIN,
  post: POST,
  postDetail: POST_DETAIL,
  postSearch: POST_SEARCH,
  commentDetail: COMMENT_DETAIL,
  comment: COMMENT,
}

export default routes;