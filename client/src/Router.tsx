import { Suspense } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import { QUIZ_PAGENAME, RESULT_PAGENAME } from 'src/constant';
import {
  ErrorBoundary,
  LandingPage,
  QuizPage,
  ResultsPage,
  LoginPage,
  SignUpPage,
  Page404,
  LoadingPage
} from 'src/components/Pages';

function Router() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path={`/${QUIZ_PAGENAME}`} element={<QuizPage />} />
          <Route path={`/${RESULT_PAGENAME}`} element={<ResultsPage />} />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/signup" element={ <SignUpPage /> } />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Router;
