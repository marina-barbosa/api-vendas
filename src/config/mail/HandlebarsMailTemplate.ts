import handlebars from 'handlebars';
import fs from 'fs';

interface InterfaceTemplateVariable {
  [key: string]: string | number;
}

interface InterfaceParseMailTemplate {
  file: string;
  variables: InterfaceTemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({
    file, variables
  }: InterfaceParseMailTemplate): Promise<string> {

    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf8' });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}