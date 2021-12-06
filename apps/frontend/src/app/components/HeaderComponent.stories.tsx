import * as React from "react";
import { Story, Meta } from '@storybook/react';
import HeaderComponent from './HeaderComponent';
import { MemoryRouter } from "react-router";

export default {
  component: HeaderComponent,
  title: 'HeaderComponent',
} as Meta;

const Template: Story = (args) => <MemoryRouter><HeaderComponent title={"Test"} isLoggedIn={true} {...args} /></MemoryRouter>;

export const Primary = Template.bind({});
Primary.args = {};
