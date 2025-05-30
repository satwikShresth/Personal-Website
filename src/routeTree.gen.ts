/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayerImport } from './routes/_layer'
import { Route as LayerIndexImport } from './routes/_layer/index'
import { Route as LayerResumeImport } from './routes/_layer/resume'
import { Route as LayerProjectsImport } from './routes/_layer/projects'
import { Route as LayerPhotographyImport } from './routes/_layer/photography'
import { Route as LayerHomeImport } from './routes/_layer/home'
import { Route as LayerExperienceImport } from './routes/_layer/experience'
import { Route as LayerBlogImport } from './routes/_layer/blog'
import { Route as LayerBlogIndexImport } from './routes/_layer/blog/index'
import { Route as LayerBlogPostImport } from './routes/_layer/blog/$post'

// Create/Update Routes

const LayerRoute = LayerImport.update({
  id: '/_layer',
  getParentRoute: () => rootRoute,
} as any)

const LayerIndexRoute = LayerIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayerRoute,
} as any)

const LayerResumeRoute = LayerResumeImport.update({
  id: '/resume',
  path: '/resume',
  getParentRoute: () => LayerRoute,
} as any)

const LayerProjectsRoute = LayerProjectsImport.update({
  id: '/projects',
  path: '/projects',
  getParentRoute: () => LayerRoute,
} as any)

const LayerPhotographyRoute = LayerPhotographyImport.update({
  id: '/photography',
  path: '/photography',
  getParentRoute: () => LayerRoute,
} as any)

const LayerHomeRoute = LayerHomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => LayerRoute,
} as any)

const LayerExperienceRoute = LayerExperienceImport.update({
  id: '/experience',
  path: '/experience',
  getParentRoute: () => LayerRoute,
} as any)

const LayerBlogRoute = LayerBlogImport.update({
  id: '/blog',
  path: '/blog',
  getParentRoute: () => LayerRoute,
} as any)

const LayerBlogIndexRoute = LayerBlogIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayerBlogRoute,
} as any)

const LayerBlogPostRoute = LayerBlogPostImport.update({
  id: '/$post',
  path: '/$post',
  getParentRoute: () => LayerBlogRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layer': {
      id: '/_layer'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayerImport
      parentRoute: typeof rootRoute
    }
    '/_layer/blog': {
      id: '/_layer/blog'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof LayerBlogImport
      parentRoute: typeof LayerImport
    }
    '/_layer/experience': {
      id: '/_layer/experience'
      path: '/experience'
      fullPath: '/experience'
      preLoaderRoute: typeof LayerExperienceImport
      parentRoute: typeof LayerImport
    }
    '/_layer/home': {
      id: '/_layer/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof LayerHomeImport
      parentRoute: typeof LayerImport
    }
    '/_layer/photography': {
      id: '/_layer/photography'
      path: '/photography'
      fullPath: '/photography'
      preLoaderRoute: typeof LayerPhotographyImport
      parentRoute: typeof LayerImport
    }
    '/_layer/projects': {
      id: '/_layer/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof LayerProjectsImport
      parentRoute: typeof LayerImport
    }
    '/_layer/resume': {
      id: '/_layer/resume'
      path: '/resume'
      fullPath: '/resume'
      preLoaderRoute: typeof LayerResumeImport
      parentRoute: typeof LayerImport
    }
    '/_layer/': {
      id: '/_layer/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayerIndexImport
      parentRoute: typeof LayerImport
    }
    '/_layer/blog/$post': {
      id: '/_layer/blog/$post'
      path: '/$post'
      fullPath: '/blog/$post'
      preLoaderRoute: typeof LayerBlogPostImport
      parentRoute: typeof LayerBlogImport
    }
    '/_layer/blog/': {
      id: '/_layer/blog/'
      path: '/'
      fullPath: '/blog/'
      preLoaderRoute: typeof LayerBlogIndexImport
      parentRoute: typeof LayerBlogImport
    }
  }
}

// Create and export the route tree

interface LayerBlogRouteChildren {
  LayerBlogPostRoute: typeof LayerBlogPostRoute
  LayerBlogIndexRoute: typeof LayerBlogIndexRoute
}

const LayerBlogRouteChildren: LayerBlogRouteChildren = {
  LayerBlogPostRoute: LayerBlogPostRoute,
  LayerBlogIndexRoute: LayerBlogIndexRoute,
}

const LayerBlogRouteWithChildren = LayerBlogRoute._addFileChildren(
  LayerBlogRouteChildren,
)

interface LayerRouteChildren {
  LayerBlogRoute: typeof LayerBlogRouteWithChildren
  LayerExperienceRoute: typeof LayerExperienceRoute
  LayerHomeRoute: typeof LayerHomeRoute
  LayerPhotographyRoute: typeof LayerPhotographyRoute
  LayerProjectsRoute: typeof LayerProjectsRoute
  LayerResumeRoute: typeof LayerResumeRoute
  LayerIndexRoute: typeof LayerIndexRoute
}

const LayerRouteChildren: LayerRouteChildren = {
  LayerBlogRoute: LayerBlogRouteWithChildren,
  LayerExperienceRoute: LayerExperienceRoute,
  LayerHomeRoute: LayerHomeRoute,
  LayerPhotographyRoute: LayerPhotographyRoute,
  LayerProjectsRoute: LayerProjectsRoute,
  LayerResumeRoute: LayerResumeRoute,
  LayerIndexRoute: LayerIndexRoute,
}

const LayerRouteWithChildren = LayerRoute._addFileChildren(LayerRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayerRouteWithChildren
  '/blog': typeof LayerBlogRouteWithChildren
  '/experience': typeof LayerExperienceRoute
  '/home': typeof LayerHomeRoute
  '/photography': typeof LayerPhotographyRoute
  '/projects': typeof LayerProjectsRoute
  '/resume': typeof LayerResumeRoute
  '/': typeof LayerIndexRoute
  '/blog/$post': typeof LayerBlogPostRoute
  '/blog/': typeof LayerBlogIndexRoute
}

export interface FileRoutesByTo {
  '/experience': typeof LayerExperienceRoute
  '/home': typeof LayerHomeRoute
  '/photography': typeof LayerPhotographyRoute
  '/projects': typeof LayerProjectsRoute
  '/resume': typeof LayerResumeRoute
  '/': typeof LayerIndexRoute
  '/blog/$post': typeof LayerBlogPostRoute
  '/blog': typeof LayerBlogIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layer': typeof LayerRouteWithChildren
  '/_layer/blog': typeof LayerBlogRouteWithChildren
  '/_layer/experience': typeof LayerExperienceRoute
  '/_layer/home': typeof LayerHomeRoute
  '/_layer/photography': typeof LayerPhotographyRoute
  '/_layer/projects': typeof LayerProjectsRoute
  '/_layer/resume': typeof LayerResumeRoute
  '/_layer/': typeof LayerIndexRoute
  '/_layer/blog/$post': typeof LayerBlogPostRoute
  '/_layer/blog/': typeof LayerBlogIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/blog'
    | '/experience'
    | '/home'
    | '/photography'
    | '/projects'
    | '/resume'
    | '/'
    | '/blog/$post'
    | '/blog/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/experience'
    | '/home'
    | '/photography'
    | '/projects'
    | '/resume'
    | '/'
    | '/blog/$post'
    | '/blog'
  id:
    | '__root__'
    | '/_layer'
    | '/_layer/blog'
    | '/_layer/experience'
    | '/_layer/home'
    | '/_layer/photography'
    | '/_layer/projects'
    | '/_layer/resume'
    | '/_layer/'
    | '/_layer/blog/$post'
    | '/_layer/blog/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayerRoute: typeof LayerRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayerRoute: LayerRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layer"
      ]
    },
    "/_layer": {
      "filePath": "_layer.tsx",
      "children": [
        "/_layer/blog",
        "/_layer/experience",
        "/_layer/home",
        "/_layer/photography",
        "/_layer/projects",
        "/_layer/resume",
        "/_layer/"
      ]
    },
    "/_layer/blog": {
      "filePath": "_layer/blog.tsx",
      "parent": "/_layer",
      "children": [
        "/_layer/blog/$post",
        "/_layer/blog/"
      ]
    },
    "/_layer/experience": {
      "filePath": "_layer/experience.tsx",
      "parent": "/_layer"
    },
    "/_layer/home": {
      "filePath": "_layer/home.tsx",
      "parent": "/_layer"
    },
    "/_layer/photography": {
      "filePath": "_layer/photography.tsx",
      "parent": "/_layer"
    },
    "/_layer/projects": {
      "filePath": "_layer/projects.tsx",
      "parent": "/_layer"
    },
    "/_layer/resume": {
      "filePath": "_layer/resume.tsx",
      "parent": "/_layer"
    },
    "/_layer/": {
      "filePath": "_layer/index.tsx",
      "parent": "/_layer"
    },
    "/_layer/blog/$post": {
      "filePath": "_layer/blog/$post.tsx",
      "parent": "/_layer/blog"
    },
    "/_layer/blog/": {
      "filePath": "_layer/blog/index.tsx",
      "parent": "/_layer/blog"
    }
  }
}
ROUTE_MANIFEST_END */
