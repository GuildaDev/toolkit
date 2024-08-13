# Motivation

When I started working at a company that utilizes the [JSON:API Serialization](https://jsonapi.org/), specifically a Ruby gem called [jsonapi-serializer](https://github.com/jsonapi-serializer/jsonapi-serializer), I encountered several challenges that prompted me to rethink our approach.

## Scenario

In our NextJS application, developers often performed operations like filtering, mapping, and reducing data during render time. Many of these renders were heavily dependent on backend data. In 2022, there were significant changes to this backend data, and every change introduced a breaking change for our frontend.

The situation was further complicated because many variables in our TypeScript project were typed as `any`. When the backend changed some properties, it became a challenging task to identify and fix what was broken. The lack of strict typing made it difficult to catch these issues early, leading to a reactive and error-prone development process.

I was working in a startup company with limited time for refactoring, which pushed me to find quick fixes to keep things running. My plan was to address the immediate issues and revisit them in the future for a more thorough solution.

## Pull someone aside for a chat

As I needed to start a new NextJS project for a new product while maintaining the stability of the current product, I created an external package called `@company/core`. This package serves as the domain owner for all product data, with 90-100% unit test coverage.

The package is responsible for handling requests, [deserializing](https://www.npmjs.com/package/deserialize-json-api) the response for easier usage, and exporting a correctly typed response.

What happens if the backend changes? We simply update the package in one place, ensuring that there are no breaking changes in the frontend. All we need to do is update the package version, and everything remains stable.

By introducing a core package into our projects, we established a clear convention from the start, eliminating the need to repeatedly think about how to handle data—it’s already been taken care of. If someone needs to add a new API action and retrieve its response, they simply switch to the package context. Here, they can focus on mocking the request/response, testing, and ensuring it meets their needs before returning to the app context.

## Results

This approach has been working successfully for over two years and has been thoroughly tested in production. The same package can also be leveraged to create a React Native app, allowing you to focus solely on the UI since all API handling is already taken care of.

## Improvements

Since we need to deserialize all data—which, fortunately, is not a performance issue for us today, even when parsing large amounts of data across multiple projects—we also have to create many type definition files.

The reason for this is that when you receive JSON:API data, it needs to be deserialized. However, deserialization returns an untyped variable with the deserialized data. To handle this properly, you need to define a type, such as `User.type.ts`, to specify that a `User` object contains fields like `firstname`, `email`, and `photos` (from the included relationships).

You may think that it's easier to get a photo doing response->included->filter_by_type === 'photos'->attributes.

It's faster, because we have no parse step, but we lose convention, so why not join the convention + directly access ?

## Performance

I created a benchmark to compare the performance of deserializing JSON:API data and directly accessing the included data. The results are as follows:

| Benchmark Type      | Total Items | Deserialization Time | Item Title             | Total Time | Get Photos in Included | Photos IDs |
|---------------------|-------------|----------------------|------------------------|------------|------------------------|------------|
| Deserialize         | 1000        | 70ms                 | Gorgeous Granite Car    | 70ms       | 0ms                    | 10877      |
| Model               | 1000        | 0ms                  | Gorgeous Granite Car    | 0ms        | 1ms                    | 10877      |

Why is the model faster? Because we don't need to parse the entire JSON:API payload. We only need to allocate the object, which is faster than parsing the entire JSON:API payload.

## The Package

The package leverages the best of metaprogramming, allowing direct access to data through an abstract model that represents a database table.

For detailed examples and usage, you can refer to the `README.md` of this project.

## Performance and Tradeoffs

By serializing, you incur an initial parsing time, but this simplifies navigating and filtering the included data.

On the other hand, if you skip parsing, you'll only need the time to allocate the object, without having to process the entire JSON:API payload.


