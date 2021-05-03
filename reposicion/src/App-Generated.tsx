import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type Oauth = {
    __typename?: 'Oauth';
    id: Scalars['ID'];
    user: User;
    remote_id: Scalars['String'];
    active: Scalars['Boolean'];
  };

export type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    oauth: Oauth;
    name: Scalars['String'];
    lastname: Scalars['String'];
    identification: Scalars['String'];
    born: Scalars['String'];
    email?: Maybe<Scalars['String']>;
    createdAt: Scalars['String'];
    updatedAt: Scalars['String'];
  };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
        id
        name
        lastname
        identification
        born
        email
    }`;

export type RegularUserFragment = (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'lastname' | 'identification' | 'born' | 'email'>
  );

export const RegisterDocument = gql`
    mutation Register($name:String!, $lastname: String!, $identification: String!, $born: Date!, $email: String!, $password: String!) {
        register(name:$name, lastname:$lastname, identification:$identification, born:$born, email:$email, password:$password) {
        errors {
        field
        message
        }
        user {
        ...RegularUser
        }
    }
} ${RegularUserFragmentDoc}`;

export type ErrorField = {
    __typename?: 'ErrorField';
    field: Scalars['String'];
    message: Scalars['String'];
  };

export type RegisterMutationVariables = Exact<{
    name: Scalars['String'];
    lastname: Scalars['String'];
    identification: Scalars['String'];
    born: Scalars['String'];
    email: Scalars['String'];
    password: Scalars['String'];
}>;
  

export type RegisterMutation = (
    { __typename?: 'Mutation' }
    & { register: (
      { __typename?: 'CResponse' }
      & { errors?: Maybe<Array<(
        { __typename?: 'ErrorField' }
        & Pick<ErrorField, 'field' | 'message'>
      )>>, user?: Maybe<(
        { __typename?: 'User' }
        & RegularUserFragment
      )> }
    ) }
);

export function useRegisterMutation() {
    return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
