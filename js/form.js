const formAdInformation = document.querySelector('.ad-form');

const formFilters = document.querySelector('.map__filters');

const switchFormState = (isDisabled, ...forms) => {
  forms.forEach((form) => {
    const classNameForm = form.className;
    form.classList.remove(classNameForm);

    if(isDisabled){
      form.classList.add(`${classNameForm}--disabled`);
    }
    else{
      form.classList.add(classNameForm.replace('--disabled',''));
    }

    form.childNodes.forEach((element) => element.disabled = isDisabled);
  });
};

const disableForms = () => switchFormState(true, formAdInformation, formFilters);

const activateForms = () => switchFormState(false, formAdInformation, formFilters);

export{activateForms, disableForms};
