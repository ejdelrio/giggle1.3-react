import superagent from 'superagent';


export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token
});

export const tokenDelete = () => {
  return {type: 'TOKEN_DELETE'};
};

export const signupRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/api/signup`)
  .send(user)
  .then(res => {
    dispatch(tokenSet(res.text));
    return res;
  })
}

export const loginRequest = user => dispatch => {
  return superagent.get(`${__API_URL__}/api/login`)
  .auth(user.userName, user.passWord)
  .then(res => {
    dispatch(tokenSet(res.text));
    return res;
  })
}
