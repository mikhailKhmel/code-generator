import fse from 'fs-extra';
import cmd, { config } from 'shelljs';
import { ENDPOINT_TYPE } from './models/enums';
import { Endpoint, Lib } from './models/types';
import { copyFolderRecursiveSync } from './utils/copy-data';

config.fatal = true;






class CodeGenerator {
    public readonly projectName: string;
    public readonly projectPath: string;

    public readonly fullPath: string;

    public readonly endpoints: Endpoint[];


    private readonly currentPath: string = __dirname.replace('\\dist', '\\src');

    public readonly libs: Lib[] = [
        { name: 'typescript', otherParams: '--save-dev' },
        { name: 'tslint', otherParams: '--save-dev' },
        { name: 'express' },
        { name: '@types/node', otherParams: '--save-dev'},
        { name: '@types/express', otherParams: '--save-dev'},
    ];

    constructor(projectPath: string, projectName: string, endpoints: Endpoint[]) {
        this.projectName = projectName;
        this.projectPath = projectPath;
        this.fullPath = `${this.projectPath}\\${this.projectName}`;

        this.endpoints = endpoints;
    }

    public projectGen(): void {
        const createProjectCmd: string = 'npm init -y';
        try {
            cmd.mkdir(this.fullPath);
            cmd.cd(this.fullPath);
            if (cmd.exec(createProjectCmd).code !== 0) {
                cmd.echo('Error: node project failed');
                cmd.exit(1);
            }
        } catch (error) {
            console.error('Ошибка генерации проекта', error);
        }
    }

    public installLibs(): void {
        const npmInstallCmd: string = 'npm install';
        this.libs.forEach(element => {
            const currentNpmCmd: string = `${npmInstallCmd} ${element.otherParams} ${element.name}`;
            try {
                cmd.cd(this.fullPath);
                cmd.exec(currentNpmCmd);
            } catch (error) {
                console.error('Ошибка установки библиотек', error);
            }
        });
    }

    public copyConfigs(): void {
        try {
            fse.copySync(`${this.currentPath}\\templates`, this.fullPath, { recursive: true });
        } catch (error) {
            console.error('Ошибка копировании конфигов', error);
        }
    }

    public patchingConfigs(): void {
        try {
            fse.readJson(`${this.fullPath}\\package.json`, (err, packageJson) => {
                if (err) console.error(err);

                packageJson.main = 'dist/index.js';
                packageJson.scripts = {
                    prebuild: 'tslint -c tslint.json -p tsconfig.json --fix',
                    build: 'tsc',
                    prestart: 'npm run build',
                    start: 'node .',
                    test: 'echo \"Error: no test specified\" && exit 1'
                };

                fse.writeJson('./package.json', packageJson, (error) => {
                    if (error) return console.error(error);
                    console.log('success!');
                });
            });
        } catch (error) {
            console.error('Ошибка патчинга конфигов', error);
        }

    }

    public addEndpoints(): void {
        const endpointTextLines: string[] = [];
        this.endpoints.forEach(element => {
            let endpoint: string = `app.{%type%}(\'{%route%}\', (req, res) => \{
                res.send('Hello, World!');
            \});`;
            endpoint = endpoint.replace('{%type%}', element.type);
            endpoint = endpoint.replace('{%route%}', element.route);
            endpointTextLines.push(endpoint);
        });
        const endpointText = endpointTextLines.join('\n');
        const indexts = fse.readFileSync(`${this.fullPath}\\src\\index.ts`).toString();
        indexts.replace('{%endpoints%}', endpointText);
        fse.outputFileSync(`${this.fullPath}\\src\\index.ts`, indexts);
        fse.readFile(`${this.fullPath}\\src\\index.ts`, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const result = data.replace(/{%endpoints%}/g, endpointText);

            fse.writeFile(`${this.fullPath}\\src\\index.ts`, result, 'utf8', (error) => {
                if (error) return console.log(error);
            });
        });
    }
}

const codeGen = new CodeGenerator('C:\\', 'test', [{ type: ENDPOINT_TYPE.GET, route: '/' }]);
codeGen.projectGen();
codeGen.installLibs();
codeGen.copyConfigs();
codeGen.patchingConfigs();
codeGen.addEndpoints();