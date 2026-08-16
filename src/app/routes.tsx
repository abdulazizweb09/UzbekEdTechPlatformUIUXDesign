import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import SavollarPage from "./pages/student/SavollarPage";
import TestModePage from "./pages/student/TestModePage";
import LeaderboardPage from "./pages/student/LeaderboardPage";
import AnalyticsPage from "./pages/student/AnalyticsPage";
import ProfilePage from "./pages/student/ProfilePage";
import HistoryPage from "./pages/student/HistoryPage";
import SavedQuestionsPage from "./pages/student/SavedQuestionsPage";
import WrongAnswersPage from "./pages/student/WrongAnswersPage";
import AchievementsPage from "./pages/student/AchievementsPage";
import CoursesPage from "./pages/student/CoursesPage";
import HomeworkPage from "./pages/student/HomeworkPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuestionManagementPage from "./pages/admin/QuestionManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AssignmentsPage from "./pages/teacher/AssignmentsPage";
import StudentProgressPage from "./pages/teacher/StudentProgressPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/student",
    element: <StudentDashboard />,
  },
  {
    path: "/student/savollar",
    element: <SavollarPage />,
  },
  {
    path: "/student/test/:mode",
    element: <TestModePage />,
  },
  {
    path: "/student/leaderboard",
    element: <LeaderboardPage />,
  },
  {
    path: "/student/analytics",
    element: <AnalyticsPage />,
  },
  {
    path: "/student/profile",
    element: <ProfilePage />,
  },
  {
    path: "/student/history",
    element: <HistoryPage />,
  },
  {
    path: "/student/saved",
    element: <SavedQuestionsPage />,
  },
  {
    path: "/student/wrong-answers",
    element: <WrongAnswersPage />,
  },
  {
    path: "/student/achievements",
    element: <AchievementsPage />,
  },
  {
    path: "/student/courses",
    element: <CoursesPage />,
  },
  {
    path: "/student/homework",
    element: <HomeworkPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/questions",
    element: <QuestionManagementPage />,
  },
  {
    path: "/admin/users",
    element: <UserManagementPage />,
  },
  {
    path: "/admin/analytics",
    element: <AdminAnalyticsPage />,
  },
  {
    path: "/teacher",
    element: <TeacherDashboard />,
  },
  {
    path: "/teacher/assignments",
    element: <AssignmentsPage />,
  },
  {
    path: "/teacher/students",
    element: <StudentProgressPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
