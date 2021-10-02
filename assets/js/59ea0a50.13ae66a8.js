"use strict";(self.webpackChunkngrx_course=self.webpackChunkngrx_course||[]).push([[962],{2669:function(e,t,a){a.r(t),a.d(t,{contentTitle:function(){return c},default:function(){return u},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return d}});var n=a(7462),s=a(3366),o=(a(7294),a(3905)),i=a(6213),r=["components"],l={title:"Chapter 11: Effects in depth",sidebar_position:11},c=void 0,p={unversionedId:"chapter-11",id:"chapter-11",isDocsHomePage:!1,title:"Chapter 11: Effects in depth",description:"HTTP is not the only type of side effects",source:"@site/docs/chapter-11.mdx",sourceDirName:".",slug:"/chapter-11",permalink:"/ngrx-essentials-course/docs/chapter-11",editUrl:"https://github.com/this-is-angular/ngrx-essentials-course/edit/main/docs/chapter-11.mdx",tags:[],version:"current",sidebarPosition:11,frontMatter:{title:"Chapter 11: Effects in depth",sidebar_position:11},sidebar:"courseSidebar",previous:{title:"Chapter 10: Working with side effects",permalink:"/ngrx-essentials-course/docs/chapter-10"},next:{title:"Chapter 12: NgRx and Lazy Loading",permalink:"/ngrx-essentials-course/docs/chapter-12"}},d=[{value:"HTTP is not the only type of side effects",id:"http-is-not-the-only-type-of-side-effects",children:[]},{value:"Not all effects should dispatch",id:"not-all-effects-should-dispatch",children:[]},{value:"Handling multiple Effects",id:"handling-multiple-effects",children:[]},{value:"Homework",id:"homework",children:[]}],h={toc:d};function u(e){var t=e.components,a=(0,s.Z)(e,r);return(0,o.kt)("wrapper",(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"http-is-not-the-only-type-of-side-effects"},"HTTP is not the only type of side effects"),(0,o.kt)("p",null,"In the previous chapter, we have learned about using NgRx ",(0,o.kt)("inlineCode",{parentName:"p"},"Effects")," to perform HTTP requests through the Store-State architecture. In this chapter, we are going to explore some more complicated cases and tie together some things."),(0,o.kt)("p",null,"Let's explore the following scenario: we want to show toast notifications whenever there is a successful addition/deletion of a category. As we are using Angular Material, we are going to use its own ",(0,o.kt)("inlineCode",{parentName:"p"},"Snackbar")," component, which is being triggered via a special service. First of all, let's go on and add the ",(0,o.kt)("inlineCode",{parentName:"p"},"SnackbarModule")," to our ",(0,o.kt)("inlineCode",{parentName:"p"},"AppModule"),". Then, let's understand how it operates in relation to NgRx ",(0,o.kt)("inlineCode",{parentName:"p"},"Store")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Effects"),". It is an action tangential to some operations on our ",(0,o.kt)("inlineCode",{parentName:"p"},"Store")," data, meaning it is, in fact, an ",(0,o.kt)("inlineCode",{parentName:"p"},"Effect"),". Now let's discuss how it will be implemented. Naturally, we are going to have many such action success messages, so we want such a solution that does not require us to write a specific effect handler for each HTTP call success message. The best approach would be such that adds an optional string ",(0,o.kt)("inlineCode",{parentName:"p"},"message")," to the HTTP call success ",(0,o.kt)("inlineCode",{parentName:"p"},"Actions")," payload, which would then be displayed by one single ",(0,o.kt)("inlineCode",{parentName:"p"},"Effect"),". Let's rewrite our category add success action:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'export const addCategorySuccess = createAction(\n  "[Category List] Add Category Success",\n  props<{ payload: { data: Category; message?: string } }>()\n);\n')),(0,o.kt)("p",null,"As you see, we changed the payload from just being a category object to a wrapper object that separately contains the response data and the message. Now, we only have to write a handler that will display the success message in the UI."),(0,o.kt)("p",null,"This effect handler, though, cannot be in a class called ",(0,o.kt)("inlineCode",{parentName:"p"},"CategoriesEffects"),", because our app will contain multiple calls and many of them will not be related to categories at all. But we will learn how to use multiple effects (and lazy load chunks of states/effects per modules) in future chapters, so for now let's put the handler in our only existing ",(0,o.kt)("inlineCode",{parentName:"p"},"Effect")," class (notice we will also have to rewrite our ",(0,o.kt)("inlineCode",{parentName:"p"},"Reducer")," slightly because of the payload type change, but we will leave this as a small exercise for the reader):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'export class CategoriesEffects {\n  // other effect handlers omitted for brevity\n\n  addCategory$ = createEffect(() =>\n    this.actions$.pipe(\n      ofType(addCategory),\n      mergeMap(({ payload }) =>\n        this.categoriesService.addCategory(payload).pipe(\n          map((result) =>\n            addCategorySuccess({\n              payload: { data: result, message: "Category successfully added" },\n            })\n          ),\n          catchError(() => of(addCategoryError()))\n        )\n      )\n    )\n  );\n\n  handleSuccessMessage$ = createEffect(() =>\n    this.actions$.pipe(\n      ofType(addCategorySuccess),\n      tap(({ payload }) =>\n        this.snackBar.open(payload.message, "Dismiss", { duration: 2000 })\n      )\n    )\n  );\n\n  constructor(\n    private readonly actions$: Actions,\n    private readonly categoriesService: CategoryService,\n    // we injected the snackbar service to use\n    private readonly snackBar: MatSnackBar\n  ) {}\n}\n')),(0,o.kt)("h2",{id:"not-all-effects-should-dispatch"},"Not all effects should dispatch"),(0,o.kt)("p",null,"You might notice that out Effect handler does not ",(0,o.kt)("inlineCode",{parentName:"p"},"map")," the piped ",(0,o.kt)("inlineCode",{parentName:"p"},"Action")," to another ",(0,o.kt)("inlineCode",{parentName:"p"},"Action")," as in all other cases; that is because after performing this ",(0,o.kt)("inlineCode",{parentName:"p"},"Action")," there is nothing else we have to do in terms of our ",(0,o.kt)("inlineCode",{parentName:"p"},"State"),". This is a side effect purely for the purpose of the side effect. But this (not mapping to another ",(0,o.kt)("inlineCode",{parentName:"p"},"Action"),") will actually cause a ",(0,o.kt)("inlineCode",{parentName:"p"},"TypeError"),", as NgRx expects the Effect stream to map to an ",(0,o.kt)("inlineCode",{parentName:"p"},"Action"),". So how do we fix this?"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'export class CategoriesEffects {\n  // other effect handlers omitted for brevity\n\n  handleSuccessMessage$ = createEffect(\n    () =>\n      this.actions$.pipe(\n        ofType(addCategorySuccess),\n        tap(({ payload }) =>\n          this.snackBar.open(payload.message, "Dismiss", { duration: 2000 })\n        )\n      ),\n    { dispatch: false }\n  );\n\n  // constructor omitted\n}\n')),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"dispatch: false")," flag is used to indicate to NgRx that this particular effect is not impacting the ",(0,o.kt)("inlineCode",{parentName:"p"},"Store"),", so it won't be dispatching a resulting ",(0,o.kt)("inlineCode",{parentName:"p"},"Action"),". use this flag whenever you are performing effects on actions that do not result in other actions."),(0,o.kt)("h2",{id:"handling-multiple-effects"},"Handling multiple Effects"),(0,o.kt)("p",null,"But what about other success messages? Surely, we are not going to write effect handlers for each and every success message action? Turns out, NgRx got us covered; here is how we handle multiple actions in one effect:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'export class CategoriesEffects {\n  // other effect handlers omitted for brevity\n\n  handleSuccessMessage$ = createEffect(() =>\n    this.actions$.pipe(\n      ofType(addCategorySuccess, deleteCategorySuccess),\n      tap(({ payload }) =>\n        this.snackBar.open(payload.message, "Dismiss", { duration: 2000 })\n      )\n    )\n  );\n\n  // constructor omitted\n}\n')),(0,o.kt)("p",null,"So the ",(0,o.kt)("inlineCode",{parentName:"p"},"ofType")," operator can accept multiple actions and handle if any of them is dispatched. Let's understand how the ",(0,o.kt)("inlineCode",{parentName:"p"},"payload")," type is being inferred by NgRx. If we combine actions A and B with payloads of type X and Y respectively using ",(0,o.kt)("inlineCode",{parentName:"p"},"ofType"),", the resulting type will be ",(0,o.kt)("inlineCode",{parentName:"p"},"X | Y"),", meaning it will contain only properties that are present on both action types. In our case, we modified the ",(0,o.kt)("inlineCode",{parentName:"p"},"deleteCategorySuccess")," action so that its payload also contains a ",(0,o.kt)("inlineCode",{parentName:"p"},"message")," optional property of type ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),". Thus, the resulting payload type is an object ",(0,o.kt)("inlineCode",{parentName:"p"},"{message?: string}"),", which is perfect for our case."),(0,o.kt)("h2",{id:"homework"},"Homework"),(0,o.kt)("p",null,"Tasks for this homework are going to be pretty simplistic"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Add handlers for all success messages"),(0,o.kt)("li",{parentName:"ol"},"Create handlers for error messages too.")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Exercise 1 solution"),(0,o.kt)(i.Z,{title:"effects.ts",className:"language-ts",mdxType:"CodeBlock"},'export class CategoriesEffects {\n  handleSuccessMessage$ = createEffect(() =>\n    this.actions$.pipe(\n      // if you already have category update functionality covered\n      ofType(addCategorySuccess, deleteCategorySuccess, updateCategorySuccess),\n      tap(({ payload }) =>\n        this.snackBar.open(payload.message, "Dismiss", { duration: 2000 })\n      )\n    )\n  );\n}\n')),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Exercise 2 solution"),(0,o.kt)(i.Z,{title:"effects.ts",className:"language-ts",mdxType:"CodeBlock"},'export class CategoriesEffects {\n  handleErrorMessage$ = createEffect(() =>\n    this.actions$.pipe(\n      ofType(addCategoryError, deleteCategoryError),\n      tap(({ payload }) =>\n        this.snackBar.open(payload.message, "Dismiss", { duration: 2000 })\n      )\n    )\n  );\n}\n')))}u.isMDXComponent=!0}}]);