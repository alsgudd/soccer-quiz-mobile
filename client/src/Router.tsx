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
  ShimmerPage,
  LoginPage
} from 'src/components/Pages';

function Router() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<ShimmerPage />}>
        <Routes>
          <Route path={`/${QUIZ_PAGENAME}`} element={<QuizPage />} />
          <Route path={`/${RESULT_PAGENAME}`} element={<ResultsPage />} />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Router;
