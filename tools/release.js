#!/usr/bin/env node
/*
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint sloppy:true node:true */

const fs = require('fs'),
    path = require('path'),
    root = path.join(path.dirname(fs.realpathSync(__filename)), '..'),
    child_process = require('child_process');

function exec(cmd) {
    return new Promise(function (resolve, reject) {
        console.log(cmd);
        child_process.exec(cmd, function (error, stdout, stderr) {
            resolve(error, stdout, stderr);
        });
    });
}

(async () => {
    const config = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
    const devVersion = config.version;
    const matched = devVersion.match(/^(\d+\.\d+\.\d+(-\d+)?)$/);
    if (!matched) {
        console.error(`version style "${devVersion}" is not matched to X.X.X[-X].`);
        process.exit(1);
    }

    const [, version] = matched;
    config.version = version;

    await exec(`git branch -D ${version}`);
    await exec(`git checkout -b ${version}`);

    // generate configs
    const dependencies = {},
        optionalDependencies = {};
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(config, null, 4), 'utf-8');

    // generate component.json
    config.dependencies = dependencies;
    config.optionalDependencies = optionalDependencies;
    fs.writeFileSync(path.join(root, 'component.json'), JSON.stringify(config, null, 4), 'utf-8');

    // browserify
    await exec('npm run-script build');
    await exec('npm run-script build-min');
    // git add
    await exec(`git add "${root}"`);
    // git commit
    await exec(`git commit -m "Bump version ${version}"`);
    // git delete tag
    await exec(`git tag -d ${version}`);
    // git add tag
    await exec(`git tag -a ${version} -m "version ${version}"`);
    console.log('Finally you should execute npm publish and git push --tags');
})();

/* vim: set sw=4 ts=4 et tw=80 : */
