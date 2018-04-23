export enum Paths {
  URL = 'http://0.0.0.0:8080',
  GET_DOGS = '/api/dogs',
  GET_DOG = '/api/dog/:uuid',
  GET_DOGS_RANDOM = '/api/dogs/random',
  CREATE_DOG = '/api/user/:username/dogs',
  UPDATE_DOG = '/api/user/:username/dogs/:uuid',
  DELETE_DOG = '/api/user/:username/dogs/:uuid',
  GET_DOGS_BY_OWNER = '/api/dogs/owner/:uuid',

  GET_USERS = '/api/users',
  GET_USER = '/api/user/:uuid',
  CREATE_USER = '/api/users',
  UPDATE_USER = '/api/user/:username',
  DELETE_USER = '/api/user/:username',
  GET_BY_USERNAME = '/api/users/get_by_username/:username',

  GET_IMAGES = '/api/images',
  GET_IMAGE = '/api/images/:uuid',
  CREATE_IMAGE = '/api/user/:username/images',
  UPDATE_IMAGE = '/api/user/:username/images/:uuid',
  DELETE_IMAGE = '/api/user/:username/images/:uuid',
  LIKE_IMAGE = '/api/image/:uuid/like',
  LOGIN = '/api/login'
}
