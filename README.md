## AWS AppSync - Authenticated & Unauthenticated Users

> AWS AppSync now supports multiple authentication types! To learn more about how this works, check out the launch post [here](https://aws.amazon.com/blogs/mobile/using-multiple-authorization-types-with-aws-appsync-graphql-apis/).

> To learn more about how to use multiple authorization rules with Amplify GraphQL Transform, check out the documentation [here](https://aws-amplify.github.io/docs/cli-toolchain/graphql#auth).

#### The below steps are only if you want to set this up manually. We recommend using the built in APIs that enable multiple authorization types that are now part of the service.

Using the following steps, you can allow both Authenticated & Unauthenticated access to your AWS AppSync API:

1. Create an Amplify project
```sh
amplify init
```
1. Add auth with custom security configuration:

```sh
amplify add auth
```

> Do you want to use the default authentication and security configuration? __NO__

> Select the authentication/authorization services that you want to use: (Use arrow keys)
__User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and more)__

> Please provide a friendly name for your resource that will be used to label this category in the project: __YOURAPINAME__

> Please enter a name for your identity pool. __YOURIDPOOLNAME__

> Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) __Yes__

__Choose defaults for the rest of the questions__

3. Add the api

```sh
amplify add api
```
> Choose __Amazon Cognito User Pool__ as the authorization type.

4. Create the API

```sh
amplify push
```

5. In the AppSync API dashboard settings, change the authentication type to __AWS Identity and Access Management (IAM)__

6. In `aws.exports.js` on the client app, change `aws_appsync_authenticationType` to `AWS_IAM`

7. In the Cognito dashboard, click "Manage Identity Pools" & click on your identity pool.

8. Click "Edit Identity Pool" to see your "Unauthenticated role" & "Authenticated Role"

9. Open the IAM console & find the "Unauthenticated role" from step 8

10. Click "Add inline policy"

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "appsync:GraphQL"
            ],
            "Resource": [
                "arn:aws:appsync:<REGION>:<ACCOUNTID>:apis/<APIID>/types/Mutation/fields/listTodos"
            ]
        }
    ]
}
```

11. Open the IAM console & find the "Authenticated role" from step 8

12. Click "Add inline policy"

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "appsync:GraphQL"
            ],
            "Resource": [
                "arn:aws:appsync:<REGION>:<ACCOUNTID>:apis/<APIID>/types/Mutation/fields/listTodos",
                "arn:aws:appsync:<REGION>:<ACCOUNTID>:apis/<APIID>/types/Mutation/fields/createTodo"
            ]
        }
    ]
}
```

13. In index.js, add this code:

```js
import { Auth } from 'aws-amplify'
Auth.currentCredentials()
  .then(d => console.log('data: ', d))
  .catch(e => console.log('error: ', e))
```

14. You should now be able to query when logged out, & query & create mutations when logged in.

#### If you'd like to access the unique identity of the logged in user for user authorization & fine grained access control, you can access the $context.identity.cognitoIdentityId) in the resolver.
