const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  //! Get the inputs from the workflow file:

  // Get the bucket name
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: false });
  
  //! Upload files to S3 bucket
  exec.exec(`aws s3 sync ${distFolder} s3://${bucket} --region ${bucketRegion}`);
  // exec.exec(`aws s3 sync ${distFolder} s3://${bucket} --region ${bucketRegion} --delete`);

  const webisteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

  //! Output the website url
  core.setOutput('website-url', webisteUrl);
}

run();