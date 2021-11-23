import * as React from "react";
import { Story, Meta } from '@storybook/react';
import HeaderComponent from './HeaderComponent';

export default {
  component: HeaderComponent,
  title: 'HeaderComponent',
} as Meta;

const Template: Story = (args) => <HeaderComponent title={"Test"} {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
