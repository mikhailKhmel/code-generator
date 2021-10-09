import cmd, { config } from 'shelljs';

config.fatal = true;

type Lib = { name: string, otherParams?: string };

class CodeGenerator {
    public readonly projectName: string;
    public readonly projectPath: string;

    public readonly fullPath: string;

    public readonly libs: Lib[] = [
        { name: 'typescript', otherParams: '--save-dev' },
        { name: 'tslint', otherParams: '--save-dev' },
        { name: 'express' }
    ];

    constructor(projectPath: string, projectName: string) {
        this.projectName = projectName;
        this.projectPath = projectPath;
        this.fullPath = `${this.projectPath}\\${this.projectName}`;
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
        return;
    }
}

const codeGen = new CodeGenerator('C:\\', 'test');
codeGen.projectGen();
codeGen.installLibs();