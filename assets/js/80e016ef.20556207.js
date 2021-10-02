"use strict";(self.webpackChunkngrx_course=self.webpackChunkngrx_course||[]).push([[644],{9947:function(e,t,a){a.r(t),a.d(t,{contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return d}});var n=a(7462),o=a(3366),i=(a(7294),a(3905)),r=a(6213),s=["components"],l={title:"Chapter 10: Working with side effects",sidebar_position:10},c=void 0,p={unversionedId:"chapter-10",id:"chapter-10",isDocsHomePage:!1,title:"Chapter 10: Working with side effects",description:"What are side effects?",source:"@site/docs/chapter-10.mdx",sourceDirName:".",slug:"/chapter-10",permalink:"/ngrx-essentials-course/docs/chapter-10",editUrl:"https://github.com/this-is-angular/ngrx-essentials-course/edit/main/docs/chapter-10.mdx",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Chapter 10: Working with side effects",sidebar_position:10},sidebar:"courseSidebar",previous:{title:"Chapter 9: Building a real application",permalink:"/ngrx-essentials-course/docs/chapter-9"},next:{title:"Chapter 11: Effects in depth",permalink:"/ngrx-essentials-course/docs/chapter-11"}},d=[{value:"What are side effects?",id:"what-are-side-effects",children:[]},{value:"@ngrx/effects",id:"ngrxeffects",children:[]},{value:"How are handlers registered?",id:"how-are-handlers-registered",children:[]},{value:"Homework",id:"homework",children:[]}],h={toc:d};function m(e){var t=e.components,a=(0,o.Z)(e,s);return(0,i.kt)("wrapper",(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"what-are-side-effects"},"What are side effects?"),(0,i.kt)("p",null,'When working with NgRx (and probably most other state management systems) you will often encounter the phrase "side effects". But what are those really? Let\'s examine this concept closely'),(0,i.kt)("p",null,"So far, we have built an application that is pretty straightforward, it takes some data (in our case from the ",(0,i.kt)("inlineCode",{parentName:"p"},"Store"),"), and renders it to the UI. We can also modify that data using an ",(0,i.kt)("inlineCode",{parentName:"p"},"Action"),". Again this is a very simple relationship: ",(0,i.kt)("inlineCode",{parentName:"p"},"Store")," -> Data -> ",(0,i.kt)("inlineCode",{parentName:"p"},"Selectors")," -> UI -> Events (like a user adding a financial record) -> ",(0,i.kt)("inlineCode",{parentName:"p"},"Action")," -> ",(0,i.kt)("inlineCode",{parentName:"p"},"Reducer")," -> ",(0,i.kt)("inlineCode",{parentName:"p"},"Store")," and so on. But what about modifying things that are not part of the ",(0,i.kt)("inlineCode",{parentName:"p"},"Store"),", but are inevitably related to it?"),(0,i.kt)("p",null,"You might ask, why do we need NgRx to deal with logic that is not directly a part of it? Let's look at a most popular example.\nAs mentioned in the previous chapter, in a real web application the data usually comes from a remote server, a persistent database that exposes methods through an API which we can use to retrieve, add, modify and delete that data. Of course, in an app that uses ngRx we would want to store that data in the ",(0,i.kt)("inlineCode",{parentName:"p"},"Store")," and access it through a ",(0,i.kt)("inlineCode",{parentName:"p"},"Selector"),". But how do we put that data inside the ",(0,i.kt)("inlineCode",{parentName:"p"},"Store")," in the first place? We can't just make an HTTP request in the ",(0,i.kt)("inlineCode",{parentName:"p"},"initialState")," of the ",(0,i.kt)("inlineCode",{parentName:"p"},"Store"),"; we might need parameters, and also we cannot inject our service from the previous chapter there. Of course, we could do the following:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// src/app/category-list/category-list-container/category-list-container.component.ts\nimport { Component, OnInit } from "@angular/core";\nimport { Store } from "@ngrx/store";\n\nimport { categories } from "../../state/selectors";\nimport { storeCategories } from "../../state/actions";\n\n@Component({\n  selector: "app-category-list-presenter",\n  template:\n    \'<app-category-list-presenter [categories]="categories$ | async"></app-category-list-presenter>\',\n})\nexport class CategoryListContainer implements OnInit {\n  categories$ = this.store.select(categories);\n\n  constructor(\n    private readonly store: Store,\n    private readonly categoryService: CategoryService\n  ) {}\n\n  ngOnInit() {\n    this.categoryService\n      .getCategories()\n      .subscribe((categories) =>\n        this.store.dispatch(storeCategories({ payload: categories }))\n      );\n  }\n}\n')),(0,i.kt)("p",null,"In this example, we used our component to get the data from the service, then dispatch a new action that stores that categories in the application ",(0,i.kt)("inlineCode",{parentName:"p"},"State"),", so that we can use the selector to retrieve and display that data in the same component."),(0,i.kt)("p",null,"I am specifically not writing the action and the reducer part of this code, because we are not going to use this code at all, as this defeats the whole purpose of using NgRx in the first place. Think about it:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"We want our components to deal with as little business logic as possible, but in this case we have a component that goes through the entire hassle of making an HTTP call and storing the data"),(0,i.kt)("li",{parentName:"ol"},"We want less code in our components, but some real world components might load huge chunks of different data and make dozens of HTTP requests; if we start making all of those HTTP requests, we will end up with a huge, bloated component"),(0,i.kt)("li",{parentName:"ol"},'Ideally, we want a component to say "I am here, please give me my data", and just receive that data through selectors, without knowing where exactly that data came from')),(0,i.kt)("p",null,"So, essentially, loading data from a remote server is a side effect in our case; it is necessary, but it is not a part of the direct NgRx lifecycle we mentioned previously. So how do we deal with this problem?"),(0,i.kt)("h2",{id:"ngrxeffects"},"@ngrx/effects"),(0,i.kt)("p",null,"Thankfully NgRx offers another tool for solving exactly this issue, called ",(0,i.kt)("inlineCode",{parentName:"p"},"@ngrx/effects"),"."),(0,i.kt)("p",null,"Essentially, ",(0,i.kt)("inlineCode",{parentName:"p"},"@ngrx/effects")," is a library that provides functions that help us create handlers for side effects, like making HTTP calls that impact the state, and so on. Let's begin by bringing it to our application"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @ngrx/effects\n")),(0,i.kt)("p",null,"Now we have the effects library in our application. Let's register it in our ",(0,i.kt)("inlineCode",{parentName:"p"},"AppModule"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// other imports omitted\nimport { EffectsModule } from "@ngrx/effects";\n\n@NgModule({\n  // other metadata omitted\n  imports: [\n    // other imports omitted\n    EffectsModule.forRoot([]),\n  ],\n})\nexport class AppModule {}\n')),(0,i.kt)("p",null,"As you see, we imported the ",(0,i.kt)("inlineCode",{parentName:"p"},"EffectsModule")," and registered it with an empty array. This (for now) empty array is where our effects will go."),(0,i.kt)("p",null,"But what are NgRx effects? An ",(0,i.kt)("inlineCode",{parentName:"p"},"Effect")," is an ",(0,i.kt)("inlineCode",{parentName:"p"},"Injectable")," class (a service if we put it a bit harshly) that registers side-effect handling functions. Let's create an ",(0,i.kt)("inlineCode",{parentName:"p"},"effects.ts")," file in our ",(0,i.kt)("inlineCode",{parentName:"p"},"state")," folder, write an empty ",(0,i.kt)("inlineCode",{parentName:"p"},"Effect")," there and register it:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"@Injectable()\nexport class CategoriesEffects {}\n")),(0,i.kt)("p",null,"An in ",(0,i.kt)("inlineCode",{parentName:"p"},"AppModule"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// other imports omitted\nimport { CategoriesEffects } from "./state/effects.ts";\n\n@NgModule({\n  // other metadata omitted\n  imports: [\n    // other imports omitted\n    EffectsModule.forRoot([CategoriesEffects]),\n  ],\n})\nexport class AppModule {}\n')),(0,i.kt)("p",null,"Now we have a registered ",(0,i.kt)("inlineCode",{parentName:"p"},"Effect"),", and NgRx will invoke its handlers when necessary. But we haven't written any handlers yet! Before we do, let's understand the theory behind how all this works:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"As with everything in NgRx, the central thing is an ",(0,i.kt)("inlineCode",{parentName:"li"},"Action"),", that gets dispatched an tells NgRx to please perform a specific side effect"),(0,i.kt)("li",{parentName:"ol"},"Then we have a handler, that is an ",(0,i.kt)("inlineCode",{parentName:"li"},"Observable")," stream that converts our ",(0,i.kt)("inlineCode",{parentName:"li"},"Action")," to some concrete function, say an HTTP request"),(0,i.kt)("li",{parentName:"ol"},"Then that stream gets mapped to another ",(0,i.kt)("inlineCode",{parentName:"li"},"Action")," that impacts the store, say, stores the retrieved information"),(0,i.kt)("li",{parentName:"ol"},"Everything is done using RxJS streams, so we are going to up our knowledge of RxJS")),(0,i.kt)("p",null,"In our case, retrieving and storing the categories list is going to have the following steps:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"An action is dispatched telling NgRx that the categories component has been initialized"),(0,i.kt)("li",{parentName:"ol"},"An Effect handler gets invoked on our",(0,i.kt)("inlineCode",{parentName:"li"},"Action"),", makes the HTTP call to our API"),(0,i.kt)("li",{parentName:"ol"},"The returned result is being mapped to another ",(0,i.kt)("inlineCode",{parentName:"li"},"Action"),", say ",(0,i.kt)("inlineCode",{parentName:"li"},"loadCategoriesSuccess"),", which puts the data in the ",(0,i.kt)("inlineCode",{parentName:"li"},"Store")," through a reducer, something we already are familiar with")),(0,i.kt)("p",null,"Let's start setting pieces for this"),(0,i.kt)("p",null,"First of all in our ",(0,i.kt)("inlineCode",{parentName:"p"},"actions.ts")," file let's create the corresponding actions:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// other imports omitted\nimport { Category } from "./models";\n\n// other actions omitted\n\nexport const categoriesListLoaded = createAction(\n  "[Category List] Categories List Loaded"\n);\nexport const loadCategoriesSuccess = createAction(\n  "[Category List] Load Categories Success",\n  props<{ payload: Category[] }>()\n);\nexport const loadCategoriesError = createAction(\n  "[Category List] Load Categories Error"\n);\n')),(0,i.kt)("p",null,"As you can see, we have created the actions we mentioned, and also a specific ",(0,i.kt)("inlineCode",{parentName:"p"},"Action")," that will get invoked when our HTTP call fails (these kinds of things tend to happen from time to time, and we need error handling)"),(0,i.kt)("p",null,"Let's also put the success logic in our reducer function: we need to put the categories list when it is successfully retrieved:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'import { addCategory, loadCategorySuccess } from "./actions";\n\n// other imports omitted\n\nconst _reducer = createReducer(\n  initialState,\n  // other handlers omitted\n  on(loadCategorySuccess, (state, action) => ({\n    ...state,\n    categories: action.payload,\n  }))\n);\n')),(0,i.kt)("p",null,"Now we will be able to modify our state an put the categories upon successful retrieval. Let's now get down to the most important thing: creating a side effect handler"),(0,i.kt)("h2",{id:"how-are-handlers-registered"},"How are handlers registered?"),(0,i.kt)("p",null,"All handlers are ",(0,i.kt)("inlineCode",{parentName:"p"},"Observable")," streams as mentioned earlier, to which NgRx will subscribe and perform them when the corresponding ",(0,i.kt)("inlineCode",{parentName:"p"},"Action")," gets dispatched. Here is how it works:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"NgRx provides a ",(0,i.kt)("inlineCode",{parentName:"li"},"createEffect")," function that is used to register a handler"),(0,i.kt)("li",{parentName:"ol"},"It also provides us with a specific ",(0,i.kt)("inlineCode",{parentName:"li"},"Observable")," called ",(0,i.kt)("inlineCode",{parentName:"li"},"Actions"),". It is a stream of all actions dispatched in the app; basically, whenever any action gets dispatched throughout the application, this ",(0,i.kt)("inlineCode",{parentName:"li"},"Observable")," will emit it"),(0,i.kt)("li",{parentName:"ol"},"It provides us with a custom RxJS operator called ",(0,i.kt)("inlineCode",{parentName:"li"},"ofType"),", which allows us to filter out the specific actions we need for this particular side effect"),(0,i.kt)("li",{parentName:"ol"},"We can then use an operator like ",(0,i.kt)("inlineCode",{parentName:"li"},"mergeMap")," to redirect our ",(0,i.kt)("inlineCode",{parentName:"li"},"Observable")," to a service call that gets the data from the API."),(0,i.kt)("li",{parentName:"ol"},"We need to use the ",(0,i.kt)("inlineCode",{parentName:"li"},"map")," operator and change the result of our HTTP call to an ",(0,i.kt)("inlineCode",{parentName:"li"},"Action")," that puts that result in the ",(0,i.kt)("inlineCode",{parentName:"li"},"Store")," (i.e. ",(0,i.kt)("inlineCode",{parentName:"li"},"loadCategoriesSuccess"),")"),(0,i.kt)("li",{parentName:"ol"},"We can use ",(0,i.kt)("inlineCode",{parentName:"li"},"catchError")," to map the stream to the error handling ",(0,i.kt)("inlineCode",{parentName:"li"},"Action")," (i.e. ",(0,i.kt)("inlineCode",{parentName:"li"},"loadCategoriesError"),") if the request fails"),(0,i.kt)("li",{parentName:"ol"},"In other places, we can write other effects that handle error actions separately")),(0,i.kt)("p",null,"Let's see it all in action:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'import { Actions, createEffect, ofType } from "@ngrx/effects";\nimport { of } from "rxjs";\nimport { mergeMap, map, catchError } from "rxjs/operators";\n\nimport { CategoryService } from "../services/category.service";\nimport {\n  categoriesListLoaded,\n  loadCategoriesSuccess,\n  loadCategoriesError,\n} from "./actions";\n\nexport class CategoriesEffects {\n  categoriesListLoaded$ = createEffect(() =>\n    this.actions$.pipe(\n      ofType(categoriesListLoaded),\n      mergeMap(() =>\n        this.categoriesService.getCategories().pipe(\n          map((categories) => loadCategoriesSuccess({ payload: categories })),\n          catchError(() => of(loadCategoriesError()))\n        )\n      )\n    )\n  );\n\n  constructor(\n    private readonly actions$: Actions,\n    private readonly categoriesService: CategoryService\n  ) {}\n}\n')),(0,i.kt)("p",null,"Let's look at this in depth. Here, ",(0,i.kt)("inlineCode",{parentName:"p"},"categoriesListLoaded$")," is an ",(0,i.kt)("inlineCode",{parentName:"p"},"Observable")," handler for the side effect that will get invoked when the ",(0,i.kt)("inlineCode",{parentName:"p"},"CategoryListContainer")," gets initialized and indicated it wants data; because we registered the ",(0,i.kt)("inlineCode",{parentName:"p"},"Effect")," class in the ",(0,i.kt)("inlineCode",{parentName:"p"},"EffectsModule"),", NgRx will subscribe to it for us and wait for action. ",(0,i.kt)("inlineCode",{parentName:"p"},"createEffect")," function takes a callback that returns the handler. The handler itself takes the ",(0,i.kt)("inlineCode",{parentName:"p"},"Actions")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Observable"),", uses the ",(0,i.kt)("inlineCode",{parentName:"p"},"ofType")," operator to specify which exact ",(0,i.kt)("inlineCode",{parentName:"p"},"Action")," we need, then uses ",(0,i.kt)("inlineCode",{parentName:"p"},"mergeMap")," to redirect our stream to the HTTP call that our service makes, and then maps it to the success ",(0,i.kt)("inlineCode",{parentName:"p"},"Action")," when the request is performed successfully, and to an error ",(0,i.kt)("inlineCode",{parentName:"p"},"Action")," when it fails."),(0,i.kt)("p",null,"The last thing we need to do is dispatch the ",(0,i.kt)("inlineCode",{parentName:"p"},"Action")," that triggers this whole thing from the component:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"export class CategoryListContainerComponent implements OnInit {\n  categories$ = this.store.select(categories);\n\n  constructor(private readonly store: Store) {}\n\n  ngOnInit() {\n    this.store.dispatch(categoriesListLoaded());\n  }\n\n  // other methods omitted\n}\n")),(0,i.kt)("p",null,"So here is the lifecycle of this component:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"When initialized, it dispatches the ",(0,i.kt)("inlineCode",{parentName:"li"},"categoriesListLoaded")," ",(0,i.kt)("inlineCode",{parentName:"li"},"Action")),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"Effect")," gets triggered because we used ",(0,i.kt)("inlineCode",{parentName:"li"},"ofType")),(0,i.kt)("li",{parentName:"ol"},"An HTTP call is made"),(0,i.kt)("li",{parentName:"ol"},"The result of that call is mapped to the action ",(0,i.kt)("inlineCode",{parentName:"li"},"loadCategoriesSuccess")," with the corresponding payload (the list of categories)"),(0,i.kt)("li",{parentName:"ol"},"Because NgRx is subscribed to the ",(0,i.kt)("inlineCode",{parentName:"li"},"categoriesListLoaded$")," ",(0,i.kt)("inlineCode",{parentName:"li"},"Observable"),", it receives the ",(0,i.kt)("inlineCode",{parentName:"li"},"Action")," and dispatches it to the ",(0,i.kt)("inlineCode",{parentName:"li"},"Store"),", triggering the ",(0,i.kt)("inlineCode",{parentName:"li"},"Reducer")," function"),(0,i.kt)("li",{parentName:"ol"},"In the reducer our specific handler receives the categories payload and puts it in the ",(0,i.kt)("inlineCode",{parentName:"li"},"Store")),(0,i.kt)("li",{parentName:"ol"},"NgRx propagates the changes to the components"),(0,i.kt)("li",{parentName:"ol"},"Our component has used a ",(0,i.kt)("inlineCode",{parentName:"li"},"Selector")," to get the categories list data, and it will automatically receive that data when this cycle is complete"),(0,i.kt)("li",{parentName:"ol"},"That's it!")),(0,i.kt)("p",null,"Usually effects require 3 actions: one which triggers the effect handler, another one to propagate the successful result to the reducer to change the ",(0,i.kt)("inlineCode",{parentName:"p"},"State"),", and one that is dispatched where we have an error."),(0,i.kt)("h2",{id:"homework"},"Homework"),(0,i.kt)("p",null,"We created a flow in which we get the categories data from the remote API. As you remember, in ",(0,i.kt)("a",{parentName:"p",href:"./chapter-8"},"Chapter 8")," we created a delete button that removes a category, and also implemented a feature that allows the user to add a new category. So after completing this chapter you should try to:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Make the delete button actually delete the category fro the database, using our service method and a new effect"),(0,i.kt)("li",{parentName:"ol"},"Have the same for adding a category")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Hint"),": the ",(0,i.kt)("inlineCode",{parentName:"p"},"Actions")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Observable")," emits action objects themselves, so in the ",(0,i.kt)("inlineCode",{parentName:"p"},"mergeMap")," callback you can access the action object and its payload using the argument like this: ",(0,i.kt)("inlineCode",{parentName:"p"},"mergeMap((action) => doSomethingWithPayload(action.payload))")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Note"),": You will have to modify the components and the reducer function also; those are not directly relevant to this chapter's work, so won't be included in the solution example"),(0,i.kt)("p",null,"Now we have learned about effects, one of the most important features of NgRx. In the next chapter, we will dive a bit deeper and see what other use cases (apart from making HTTP requests) NgRx Effects have."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Exercise 1 solution"),(0,i.kt)(r.Z,{title:"effects.ts",className:"language-ts",mdxType:"CodeBlock"},"export class CategoriesEffects {\n  deleteCategory$ = createEffect(() =>\n    this.actions$.pipe(\n      ofType(deleteCategory),\n      mergeMap(({ payload }) =>\n        this.categoriesService.deleteCategory(payload).pipe(\n          map(() => deleteCategorySuccess({ payload })),\n          catchError(() => of(loadCategoriesError()))\n        )\n      )\n    )\n  );\n}\n")),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Exercise 2 solution"),(0,i.kt)(r.Z,{title:"effects.ts",className:"language-ts",mdxType:"CodeBlock"},"export class CategoriesEffects {\n  addCategory$ = createEffect(() =>\n    this.actions$.pipe(\n      ofType(addCategory),\n      mergeMap(({ payload }) =>\n        this.categoriesService.addCategory(payload).pipe(\n          map((result) => addCategorySuccess({ payload: result })),\n          catchError(() => of(addCategoryError()))\n        )\n      )\n    )\n  );\n}\n")))}m.isMDXComponent=!0}}]);