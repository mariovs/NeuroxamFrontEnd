import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloMario from '@/components/HelloMario'
import CategoriesMain from '@/components/CategoriesMain'
import GetAllExamsByCategory from '@/components/GetAllExamsByCategory'
import ExamDetails from '@/components/ExamDetails'
import MainPage from '@/components/MainPage'
import AddCategory from '@/components/AddCategory'
import AddExam from '@/components/AddExam'
import StartExam from '@/components/StartExam'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: "/mario",
      name: 'helloMario',
      component: HelloMario
    },
    {
      path: "/category",
      name: 'CategoriesMain',
      component: CategoriesMain
    },
    {
      path: "/exams/:id",
      name: 'ExamCategory',
      props: true,
      component: GetAllExamsByCategory
    },
    {
      path: "/exams/exam/:id",
      name: 'ExamDetails',
      props: true,
      component: ExamDetails
    },
    {
      path: "/category/add",
      name: 'AddCategory',
      props: true,
      component: AddCategory
    },
    {
      path: "/examen/add",
      name: 'AddExam',
      props: true,
      component: AddExam
    },
    {
      path: "/examen/start",
      name: 'StartExam',
      props: true,
      component: StartExam
    }       
  ]
})
