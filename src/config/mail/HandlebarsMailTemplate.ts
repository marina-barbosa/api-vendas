import handlebars from 'handlebars';

interface InterfaceTemplateVariable {
  [key: string]: string | number;
}

interface InterfaceParseMailTemplate {
  template: string;
  variables: InterfaceTemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({
    template, variables
  }: InterfaceParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}