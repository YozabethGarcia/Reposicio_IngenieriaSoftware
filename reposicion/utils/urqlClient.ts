import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from "urql";
import {  RegisterDocument, RegisterMutation, VerifyLoginQuery, VerifyLoginDocument  } from "../src/App-Generated";
import { updateQuery } from './updateQuery';

export const urqlClient = (ssrExchange: any) => ({
    url: "http://localhost:8080/graphql",
    fetchOptions: {
        credentials: "include" as const
    },
    exchanges: [dedupExchange, cacheExchange({
        updates: {
            Mutation: {
                register: (_result, args, cache, info) => {
                    updateQuery<RegisterMutation, VerifyLoginQuery>(
                        cache,
                        { query: VerifyLoginDocument },
                        _result,
                        (result, query) => {
                            if (result.register.errors) {
                                return query;
                            } else {
                                return {
                                    verifyLogin: result.register.user
                                }
                            }
                        }
                    )
                }
            }
        }
    }),
    ssrExchange, 
    fetchExchange]
})

