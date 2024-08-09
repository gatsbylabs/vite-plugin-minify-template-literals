/* eslint-disable */

function css(template: TemplateStringsArray, ...params: string[]) {
  return "css test";
}

function gql(template: TemplateStringsArray, ...params: string[]) {
  return "gql test";
}

const query = gql`
  {
    user(id: 5) {
      firstName
      lastName
    }
  }
`;

const c = css`
  padding: 1px;
`;

console.log(c, query);
