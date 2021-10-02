"use strict";(self.webpackChunkngrx_course=self.webpackChunkngrx_course||[]).push([[326],{457:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return r},contentTitle:function(){return l},metadata:function(){return h},toc:function(){return c},default:function(){return d}});var n=a(7462),i=a(3366),o=(a(7294),a(3905)),s=["components"],r={title:"Chapter 3: NgRx: The What",sidebar_position:3},l=void 0,h={unversionedId:"chapter-3",id:"chapter-3",isDocsHomePage:!1,title:"Chapter 3: NgRx: The What",description:"What is NgRx?",source:"@site/docs/chapter-3.md",sourceDirName:".",slug:"/chapter-3",permalink:"/ngrx-essentials-course/docs/chapter-3",editUrl:"https://github.com/this-is-angular/ngrx-essentials-course/edit/main/docs/chapter-3.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Chapter 3: NgRx: The What",sidebar_position:3},sidebar:"courseSidebar",previous:{title:"Chapter 2: Getting started: Installing dependencies and creating the project",permalink:"/ngrx-essentials-course/docs/chapter-2"},next:{title:"Chapter 4: NgRx: The Why",permalink:"/ngrx-essentials-course/docs/chapter-4"}},c=[{value:"What is NgRx?",id:"what-is-ngrx",children:[{value:"Flux design pattern",id:"flux-design-pattern",children:[]}]}],p={toc:c};function d(e){var t=e.components,a=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"what-is-ngrx"},"What is NgRx?"),(0,o.kt)("h3",{id:"flux-design-pattern"},"Flux design pattern"),(0,o.kt)("p",null,"During the last decade, Facebook has popularized an approach in building single page Web Applications called the ",(0,o.kt)("a",{parentName:"p",href:"https://facebook.github.io/flux/docs/in-depth-overview/"},"Flux"),". ",(0,o.kt)("a",{parentName:"p",href:"https://redux.js.org/"},"Redux"),', a vastly popular state management library for React, is built using the Flux approach, and so is NgRx. They have similar (almost the same) concepts, and serve the same need. NgRx can be called "Redux + RxJS". It combines the simplicity and centralization of Redux with the power of ',(0,o.kt)("inlineCode",{parentName:"p"},"Observables"),"."),(0,o.kt)("h4",{id:"so-what-is-flux"},"So what is Flux?"),(0,o.kt)("p",null,'In Flux, the state of the application is considered as a one unified entity, that can only be modified using a single approach, in a predesigned manner, and only in specific ways. And when we say "application state", we mean all the data that an application holds and uses to display the UI to the end user, and that can be shared between different components and layers of our application. For example, in our project, the state contains an array of categories of income, an array of expenses, an array of all expenses, and so on. This state can change through the lifecycle of the app: a user can add a new category, log some expense, or delete a log about income that was submitted erroneously. All those changes can be triggered from different parts of the application, but might be reflected in a vastly different part of the UI. For example, if a user adds a category from a special menu, it should appear in the screen where the user logs income, in a dropdown from where they can select the specific category of said income. So how do we describe such an interconnected system in a programming language without Flux? Well, there are several approaches, all of which have a varying degree of painfulness.'),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Use a global object. Of course, we can create a global ",(0,o.kt)("inlineCode",{parentName:"li"},"State")," object, which will hold the entire application data, share the reference between the components, and use it in UI rendering. But this approach brings forward several problems:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"State can be modified from unexpected places in unexpected ways. Someone might carelessly overwrite an existing value, thus creating a bug, and then the next developer will have a ridiculously hard time trying to find out exactly from where the problem arises."),(0,o.kt)("li",{parentName:"ul"},"Asynchronous programming poses yet another big threat to this idea, with async callbacks accessing the same reference of the object and modifying it, possible overwriting data that should have been used by another callback, introducing hard-to-fix issues like race conditions and such."))),(0,o.kt)("li",{parentName:"ol"},"Using an event delivery system (like an event bus) that will notify component about specific events to which those components need to react accordingly. This would be a better approach, but still introduces problems:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"We need to subscribe to events in every component, possibly more than a dozen of those. This can make the component code unreadable."),(0,o.kt)("li",{parentName:"ul"},"When an event is sent, it is hard to really determine ",(0,o.kt)("em",{parentName:"li"},"how exactly")," the state of the application is being modified. We would need to go through all subscriptions of that event to get a grasp of what it really does (and it still might not be enough)"),(0,o.kt)("li",{parentName:"ul"},"Such a system might tempt developers to write lots of side effects (we will talk about side effects and how we deal with them in NgRx in later chapters)"),(0,o.kt)("li",{parentName:"ul"},"If two components access the same state, we will have a problem synchronizing them together, paving way for new hard-to-fix bugs")))),(0,o.kt)("h4",{id:"so-what-does-flux-do"},"So what does Flux do?"),(0,o.kt)("p",null,"Flux solves this problem with a series of easy to grasp concepts, which bundled together comprise a state management system. It sort of utilizes both previous approaches in a way that"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Makes state easy to synchronize"),(0,o.kt)("li",{parentName:"ul"},"Makes changes to the state easy to track"),(0,o.kt)("li",{parentName:"ul"},"Allows to a actually debug state changes"),(0,o.kt)("li",{parentName:"ul"},"Is declarative")),(0,o.kt)("p",null,'NgRx does the same, but for Angular. If at this point you think "why do I event bother? My app works fine right now", then let\'s now explore why exactly do we need solutions like NgRx.'))}d.isMDXComponent=!0}}]);