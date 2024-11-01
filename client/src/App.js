import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingNav from "./Components/Listener/LandingNav";
import ListenerLogin from "./Components/Listener/ListenerLogin";
import LandingPage from "./Pages/Listener/LandingPage";
import Footer from "./Pages/Listener/Footer";
import ListenerRegister from "./Components/Listener/ListenerRegister";
import ForgotPassword from "./Components/Listener/ForgotPassword";
import ListenerEdit from "./Components/Listener/ListenerProfileEdit";
import CreatorProfileEdit from './Components/Creator/CreatorProfileEdit';
import CreatorLogin from './Components/Creator/CreatorLogin';
import CreatorRegister from './Components/Creator/CreatorRegistration';
import AdminLandingPage from "./Components/Admin/AdminLandingPage";
import ListenerWhishlist from "./Components/Listener/ListenerWhishlist";
import ListenerProfile from "./Components/Listener/ListenerProfile";
import ListenerSubscription from "./Components/Listener/ListenerSubscription";
import ListenerNav from "./Components/Listener/ListenerNav";
import CreatorNavbar from "./Components/Creator/CreatorNavbar";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminSidebar from "./Components/Admin/AdminSidebar";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ListenerHome from "./Components/Listener/ListenerHome";
import CreatorForgot from "./Components/Creator/CreatorForgot";
import CreatorProfile from "./Components/Creator/CreatorProfile";
import CreatorUploadPage from "./Components/Creator/CreatorUploadPage";
import CreatorUploadPoadcastEdit from "./Components/Creator/CreatorUploadPoadcastEdit";
import CreatorEpisodeAdd from "./Components/Creator/CreatorEpisodeAdd";
import CreatorSubscription from "./Components/Creator/CreatorSubscription";
import CreatorPodcastList from "./Components/Creator/CreatorPodcastList";
import Paymentform from "./Pages/payment/Paymentform";
import ListenerList from "./Pages/Admin/ListenerList";
import CreatorList from "./Pages/Admin/CreatorList";
import PodcastList from "./Pages/Admin/PodcastList";
import SbscriptionList from "./Pages/Admin/SbscriptionList";
import CreatorEpisodes from "./Components/Creator/CreatorEpisodes";
import CreatorEditEpisode from "./Components/Creator/CreatorEditEpisode";
import Subscriptions from "./Components/Listener/Subscriptions";
import ListenerViewEpisode from "./Pages/Listener/ListenerViewEpisode";
import AdminViewEpisode from "./Pages/Admin/AdminViewEpisode";
import ViewReview from "./Pages/Creator/ViewReview";
import HidePermanentlyOnClick from './Pages/Hide'
import ExamCoordinatorLogin from "./Components/AdminExam Coordinator/AdminExamCoordinatorLogin";
import ExamCoordinateEdit from "./Components/AdminExam Coordinator/AdminExamCoordinateView";
import ExamCoordinatorSave from "./Components/AdminExam Coordinator/AdminExamCoordinatorEdit";
import AdminExamCoordinatorLogin from "./Components/AdminExam Coordinator/AdminExamCoordinatorLogin";
import AdminExamCoordinateView from "./Components/AdminExam Coordinator/AdminExamCoordinateView";
import AdminExamCoordinatorEdit from "./Components/AdminExam Coordinator/AdminExamCoordinatorEdit";
import ExamCordinatorLogin from "./Pages/Exam Coordinator/ExamCordinatorLogin";
import ExamCoordinatorHome from "./Pages/Exam Coordinator/ExamCoordinatorHome";
import ExamCoordinatorNav from "./Pages/Exam Coordinator/ExamCoordinatorNav";
import ViewRequest from "./Pages/Exam Coordinator/ViewRequest";
import ExamCoordinatorViewQuestion from "./Pages/Exam Coordinator/ExamCoordinatorViewQuestion";
import Viewall from "./Pages/Exam Coordinator/Viewall";
import ViewAllQuestion from "./Pages/Exam Coordinator/ViewAllQuestion";
import AddQuestion from "./Components/Creator/AddQuestion";
import AddQuestion1 from "./Components/Creator/AddQuestion1";
import ViewQuestion from "./Components/Creator/ViewQuestion";
import EditQuestions from "./Components/Creator/EditQuestions";
import ExamQuestionStatus from "./Components/Creator/ExamQuestionStatus";
import ViewReport from "./Components/Creator/ViewReport";
import CreatorHomePage from "./Components/Creator/CreatorHomePage";
import ListenerMainNavbar from "./Components/Listener/ListenerMainNavbar";
import ListenerReport from "./Components/Listener/ListenerReport";
import ListenerExam from "./Pages/Listener/ListenerExam";
import ExamReportDetail from "./Components/Creator/ExamReportDetail";
function App() {

  const url = 'http://localhost:4030/'
  // const url = 'http://hybrid.srishticampus.in:4030/'

  return (
    <BrowserRouter basename="/educational_podcast">
      <Routes>

        <Route path="/landingnav" element={<LandingNav />} />
        <Route path="/listenernav" element={<ListenerNav url={url} />} />
        <Route path="/creatornav" element={<CreatorNavbar url={url} />} />


        <Route path="/" element={[<LandingNav props={{ value: "listenerlanding" }} />, <LandingPage />, <Footer />]} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/sidebar" element={<AdminSidebar />} />

        <Route path="/listenerlogin" element={[<LandingNav props={{ value: "listenerlanding" }} />, <ListenerLogin />, <Footer />]} />
        <Route path='/listenerregister' element={[<LandingNav props={{ value: "listenerlanding" }} />, <ListenerRegister />, <Footer />]} />
        <Route path='/listeneredit' element={[<ListenerNav url={url} />, <ListenerEdit url={url} />, <Footer />]} />

        <Route path="/listenerhome" element={[<ListenerMainNavbar url={url} />, <ListenerHome props={{ role: "listenerhome" }} />, <CreatorPodcastList data={{ url: url, role: 'listener' }} />, <Footer />]} />
        <Route path="/listenermainnavbar" element={[<ListenerMainNavbar url={url}/>]} />
        <Route path="/forgotpassword" element={[<LandingNav props={{ value: "listenerlanding" }} />, <ForgotPassword />, <Footer />]} />
        <Route path='/listenerWhishlist' element={[<ListenerMainNavbar url={url} />, <ListenerWhishlist url={url}/>, <Footer />]} />
        <Route path='/listenerProfile' element={[<ListenerMainNavbar url={url} />, <ListenerProfile url={url} />, <Footer />]} />
        <Route path='/listenersubscription' element={[<ListenerMainNavbar url={url} />, <ListenerSubscription data={{ url: url, role: 'listener' }} />, <Footer />]} />
        <Route path="/listenerexamreport" element={[<ListenerMainNavbar url={url}/>,<ListenerReport/>,<Footer/>]} />
        <Route path="/listenerexam/:id" element={[<ListenerMainNavbar url={url}/>,<ListenerExam/>,<Footer/>]} />


        
        <Route path="/creatorlogin" element={[<LandingNav props={{ value: "creatorlanding" }} />, <CreatorLogin />, <Footer />]} />
        <Route path='/creatorregister' element={[<LandingNav props={{ value: "creatorlanding" }} />, <CreatorRegister />, <Footer />]} />
        <Route path="/creatorhomepage" element={[<CreatorNavbar url={url} />,<CreatorHomePage/> ,<CreatorPodcastList data={{ url: url, role: 'creator' }} />,<Footer/>]} />
        <Route path='/creatorsubscription' element={[<CreatorNavbar url={url} />, <CreatorSubscription />, <Footer />]} />
        <Route path='/creatorprofile' element={[<CreatorNavbar url={url} />, <CreatorProfile url={url} />, <CreatorPodcastList data={{ url: url, role: 'creator' }} />, <Footer />]} />
        <Route path="/creatorforgotpassword" element={[<LandingNav props={{ value: "creatorlanding" }} />, <CreatorForgot />, <Footer />]} />
        <Route path="/createraddquestion" element={[<CreatorNavbar url={url}/>,<AddQuestion/>,<Footer/>]} />
        <Route path="/createraddquestion1" element={<AddQuestion1/>} />
        <Route path="/createrviewquestion" element={[<CreatorNavbar url={url}/>,<ViewQuestion/>,<Footer/>]} />
        <Route path="/createreditquestion" element={[<CreatorNavbar url={url}/>,<EditQuestions/>,<Footer/>]} />
        <Route path="/createrexamquestionstatus" element={[<CreatorNavbar url={url}/>,<ExamQuestionStatus/>,<Footer/>]} />
        <Route path="/createrviewreport" element={[<CreatorNavbar url={url}/>,<ViewReport url={url}/>,<Footer/>]} />
        <Route path="/createrviewreportdetail/:ansid" element={[<CreatorNavbar url={url}/>,<ExamReportDetail url={url}/>,<Footer/>]} />


        <Route path='/creatorredit' element={[<CreatorNavbar url={url} />, <CreatorProfileEdit />, <Footer />]} />
        <Route path='/creatorupload' element={<CreatorUploadPage />} />
        <Route path='/creatoruploadedit' element={<CreatorUploadPoadcastEdit />} />
        <Route path='/creatorepisodadd/:id' element={<CreatorEpisodeAdd />} />
        <Route path='/creatorpodcastlist' element={[<CreatorPodcastList data={{ url: url, role: 'creator' }} />]} />

        <Route path="/adminhome" element={[<AdminLandingPage />, <Footer />]} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={[<AdminDashboard url={url} isDashboard />, <Footer />]} />
        <Route path="/paymentform/:id" element={<Paymentform />} />
        <Route path="/listenerlist" element={<ListenerList url={url} />} />
        <Route path="/creatorlist" element={<CreatorList url={url} />} />
        <Route path="/podcastlist" element={<PodcastList url={url} />} />
        <Route path="/subscriptionList" element={<SbscriptionList />} />
        <Route path="/creatorepisodes/:id" element={[<CreatorNavbar url={url} />, <CreatorEpisodes url={url} />, <Footer />]} />
        <Route path="/creatoreditepisode/:id" element={[<CreatorNavbar url={url} />, <CreatorEditEpisode url={url} />, <Footer />]} />
        <Route path="/subscription" element={[<CreatorNavbar url={url} />, <Subscriptions url={url} />, <Footer />]} />
        <Route path="/listenerviewepisode/:id" element={[<ListenerNav url={url} />, <ListenerViewEpisode url={url} role={'listenerviewepisode'}/>, <Footer />]} />
        <Route path="/episodedetailpage/:id" element={[<ListenerNav url={url} />, <ListenerViewEpisode url={url} role={'detailPage'}/>, <Footer />]} />
        <Route path="/adminviewepisode/:id" element={<AdminViewEpisode url={url} />} />
        <Route path="/viewreview/:id" element={[<CreatorNavbar url={url} />,<ViewReview url={url} />, <Footer />]} />
        <Route path="/hide" element={<HidePermanentlyOnClick/>}/>

        <Route path='/adminexamcoordinatelogin' element={<AdminExamCoordinatorLogin/>} />
        <Route path='/adminexamcoordinateview' element={<AdminExamCoordinateView/>} />
        <Route path='/adminexamcoordinatesave' element={<AdminExamCoordinatorEdit/>} />

        <Route path='/examcoordinatelogin' element={<ExamCordinatorLogin/>} />
        <Route path='/examcoordinateNav' element={<ExamCoordinatorNav/>} />
        <Route path='/examcoordinatehome' element={[<ExamCoordinatorNav/>,<ExamCoordinatorHome/>,<Footer/>]} />
        <Route path='/examcoordinateviewrequest' element={[<ExamCoordinatorNav/>,<ViewRequest url={url}/>,<Footer/>]} />
        <Route path='/examcoordinateviewquestion/:id' element={[<ExamCoordinatorNav/>,<ExamCoordinatorViewQuestion/>,<Footer/>]} />
        <Route path='/examcoordinateviewall' element={[<ExamCoordinatorNav/>,<Viewall url={url} />,<Footer/>]} />
        <Route path='/examcoordinateviewallquestion/:id' element={[<ExamCoordinatorNav/>,<ViewAllQuestion/>,<Footer/>]} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
