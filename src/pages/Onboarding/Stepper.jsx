import React from 'react';
import { MobileStepper, Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const NextButton = ({ onClick, disabled }) => (
  <Button size="small" onClick={onClick} disabled={disabled}>
    Next
    <KeyboardArrowRight />
  </Button>
);

const BackButton = ({ onClick, disabled }) => (
  <Button size="small" onClick={onClick} disabled={disabled}>
    <KeyboardArrowLeft />
    Back
  </Button>
);

const Stepper = ({ activeStep, onBack, onNext, isSubmitting }) => {
  const nextButton = (
    <NextButton onClick={onNext} disabled={activeStep === 3 || isSubmitting} />
  );
  const backButton = <BackButton onClick={onBack} disabled />;

  return (
    <MobileStepper
      variant="dots"
      steps={4}
      position="static"
      activeStep={activeStep}
      nextButton={nextButton}
      backButton={backButton}
    />
  );
};

export default Stepper;
