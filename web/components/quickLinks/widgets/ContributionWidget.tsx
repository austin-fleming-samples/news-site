/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import type { ContributionWidget as ContributionWidgetCodegen } from '@cms/types/codegen';
import { ContributionForm } from './ContributionForm';
import { WidgetCover } from './WidgetCover';
import { WidgetWrapper } from './WidgetWrapper';

interface ContributionWidgetProps {
  widget: ContributionWidgetCodegen;
}

export const ContributionWidget = ({ widget }: ContributionWidgetProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <WidgetWrapper color={widget.widgetStyles.color}>
      <WidgetCover
        clickAction={() => {
          setShowForm(!showForm);
        }}
        label={widget.label}
        showCover={!showForm}
      />

      <ContributionForm showForm={showForm} />
    </WidgetWrapper>
  );
};
