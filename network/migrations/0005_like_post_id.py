# Generated by Django 3.2.8 on 2021-11-19 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_like'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='post_id',
            field=models.IntegerField(default=0),
        ),
    ]
